package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.Config.NoDuplicates;
import com.emailmkt.emailmarketing.dto.WorkflowDTO;
//import com.emailmkt.emailmarketing.model.Task;
import com.emailmkt.emailmarketing.model.*;
//import com.emailmkt.emailmarketing.repository.TaskRepository;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.WorkflowService;
import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.instance.FlowElement;
import org.camunda.bpm.model.bpmn.instance.FlowNode;
import org.camunda.bpm.model.bpmn.instance.Process;
import org.camunda.bpm.model.bpmn.instance.SequenceFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class WorkflowServiceImpl implements WorkflowService {

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentSubcriberRepository appointmentSubcriberRepository;

    @Autowired
    GroupContactRepository groupContactRepository;
    @Autowired
    TaskRepository taskRepository;

    @Override
    public boolean createWorkflow(WorkflowDTO workflowDTO) {
        Workflow newWorkflow = new Workflow();
        newWorkflow.setName(workflowDTO.getWorkflowName());
        newWorkflow.setModel(workflowDTO.getWtWorkflowDTOS());
        List<WorkflowGroupContact> workflowGroupContactsGroupContacts = workflowDTO.getGcWorkflowDTOS().stream().map(g -> {
            WorkflowGroupContact workflowGroupContact = new WorkflowGroupContact();
            workflowGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            workflowGroupContact.setWorkflow(newWorkflow);
            workflowGroupContact.setCreatedTime(LocalDateTime.now().toString());


            return workflowGroupContact;
        }).collect(Collectors.toList());

        newWorkflow.setWorkflowGroupContacts(workflowGroupContactsGroupContacts);
//        newWorkflow.setWorkflowTasks(workflowTaskList);
        workflowRepository.save(newWorkflow);

        String bpmnString = workflowDTO.getWtWorkflowDTOS();
        InputStream inputStream = new ByteArrayInputStream(bpmnString.getBytes(Charset.forName("UTF-8")));
        org.camunda.bpm.model.bpmn.BpmnModelInstance modelInstance = Bpmn.readModelFromStream(inputStream);
        Process process = (Process) modelInstance.getModelElementById("Process_1");
//            System.out.println(format(process.getFlowElements()));
        Collection<FlowElement> elements = process.getFlowElements();
        Iterator<FlowElement> eList = elements.iterator();
        int i = 0;
        while (eList.hasNext()) {
            String shapeId = eList.next().getId();
            if (shapeId.contains("Task")) {
                String name = modelInstance.getModelElementById(shapeId).getAttributeValue("name");
                org.camunda.bpm.model.bpmn.instance.Task taskModel = (org.camunda.bpm.model.bpmn.instance.Task) modelInstance.getModelElementById(shapeId);
                Collection<FlowNode> sequenceFlowsPrevious = taskModel.getPreviousNodes().list();
                Iterator<FlowNode> sequenceFlowListsPrevious = sequenceFlowsPrevious.iterator();
                Task newWorkflowTask = new Task();
                newWorkflowTask.setWorkflow(newWorkflow);
                newWorkflowTask.setName(name);
                newWorkflowTask.setShape_id(shapeId);
                if (shapeId.contains("SendTask")) {
                    newWorkflowTask.setType("campaign");
                } else if (shapeId.contains("BusinessRule")) {
                    newWorkflowTask.setType("appointment");
                }

                while (sequenceFlowListsPrevious.hasNext()) {
                    FlowNode previousNode = sequenceFlowListsPrevious.next();
                    String previousNodeId = previousNode.getId();
                    if (previousNodeId.contains("Task")) {
                        newWorkflowTask.setPreTask(previousNodeId);

                    } else if (previousNodeId.contains("ExclusiveGateway")) {
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(previousNodeId);
                        List<FlowNode> prevNodesCollection = gateway.getPreviousNodes().list();
                        Iterator<SequenceFlow> prevFlowCollection = gateway.getOutgoing().iterator();
                        FlowNode conditionNode = prevNodesCollection.get(0);
                        String gatewayNode = previousNode.getName();
                        while (prevFlowCollection.hasNext()) {
                            SequenceFlow sequenceFlow = prevFlowCollection.next();
                            if (sequenceFlow.getTarget().getId().equals(shapeId)) {
                                gatewayNode = gatewayNode.concat(sequenceFlow.getName());
                            }
                        }


                        newWorkflowTask.setGateway(gatewayNode);

                        newWorkflowTask.setPreTask(previousNode.getPreviousNodes().singleResult().getId());
                        newWorkflowTask.setWorkflow(newWorkflow);

                    }
                    taskRepository.save(newWorkflowTask);


                }

            }


        }
        return true;
    }

    @Override
    public List<Workflow> getAllWorkflows() {

        return workflowRepository.findAll();
    }


    @Override
    public Workflow getWorkflowById(int id) {
        return workflowRepository.findWorkflowById(id);
    }

    @Scheduled(fixedRate = 10000)
    @Override
    public void runWorkflow() {
        ExecutorService executor = Executors.newFixedThreadPool(30);
        List<Workflow> workflows = workflowRepository.findWorkflowByStatus();
//        PriorityQueue<Task> workflowTaskQueue = new NoDuplicates<Task>();
        if (workflows != null) {
            for (Workflow workflow : workflows) {
                executor.execute(new Runnable() {
                    @Override
                    public void run() {
                        //get all subcriber
                        for (WorkflowGroupContact workflowGroupContact : workflow.getWorkflowGroupContacts()) {

                            List<Subcriber> subcribers = groupContactRepository.findSubcriberByGroupContactId(workflowGroupContact.getGroupContact().getId());
                            for (Subcriber subcriber : subcribers) {
                                for (Task task : workflow.getTasks()) {

                                    //find 1st task
                                    if (task.getPreTask() == "") {
                                        if (task.getType() == "appointment") {

                                            Appointment appointment = appointmentRepository.findAppointmentByName(task.getName());

                                            if (appointmentSubcriberRepository.checkConfirmAppointment(appointment.getId(), subcriber.getEmail()) ==0) {
                                                for (Task task2 : taskRepository.findTaskByPreTask(task.getShape_id())) {
                                                    if (task2.getGateway().equalsIgnoreCase("Clicked ?yes")) {
                                                        if (task2.getType() == "appointment") {

                                                        }
                                                    }
                                                }
                                            } else {

                                            }

                                        }
                                    }


                                }
                            }
                        }
                    }
                });

            }
        }
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }



}
