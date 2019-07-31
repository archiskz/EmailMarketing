package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.*;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.MailService;
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
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

//import com.emailmkt.emailmarketing.model.Task;
//import com.emailmkt.emailmarketing.repository.TaskRepository;

@Service
public class WorkflowServiceImpl implements WorkflowService {

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    MailService mailService;


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
                Collection<FlowNode> sequenceFlowsNext = taskModel.getSucceedingNodes().list();
                Iterator<FlowNode> sequenceFlowListsNext = sequenceFlowsNext.iterator();
                Task newWorkflowTask = new Task();
                newWorkflowTask.setWorkflow(newWorkflow);
                newWorkflowTask.setName(name);
                newWorkflowTask.setShape_id(shapeId);
                //set task Type
                if (shapeId.contains("SendTask")) {
                    newWorkflowTask.setType("campaign");
                } else if (shapeId.contains("BusinessRule")) {
                    newWorkflowTask.setType("appointment");
                }

                //Find previous node
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

//                        newWorkflowTask.setPostTask(nextNodeId);
////                        workflowTaskRepository.save(newWorkflowTask);
//                        workflowTaskList.add(newWorkflowTask);
//                        workflowTaskRepository.save(newWorkflowTask);
                    } else if (name.contains("ExclusiveGateway")) {
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(name);

                        Collection<FlowNode> nextNodesCollection = gateway.getSucceedingNodes().list();
                        Iterator<FlowNode> nextNodeLists = nextNodesCollection.iterator();
                        Iterator<SequenceFlow> nextFlowCollection = gateway.getIncoming().iterator();

//                        }
                        while (nextNodeLists.hasNext()) {
//                            WorkflowTask newWorkflowTask = new WorkflowTask();
//                            newWorkflowTask.setTask(task);
//                            newWorkflowTask.setWorkflow(newWorkflow);
                            FlowNode conditionNode = nextNodeLists.next();
                            System.out.println(conditionNode.getName() + "---" + conditionNode.getId());

                            Collection<SequenceFlow> f1 = conditionNode.getIncoming();
                            Collection<SequenceFlow> f2 = gateway.getOutgoing();
                            f1.containsAll(f2);
                            SequenceFlow conditionFlow = f1.iterator().next();
//                            newWorkflowTask.setGateway(gateway.getName() + " " + conditionFlow.getName());
//                            newWorkflowTask.setPostTask(conditionNode.getId());
//                            workflowTaskList.add(newWorkflowTask);
//                            workflowTaskRepository.save(newWorkflowTask);
                        }


                    }
                    taskRepository.save(newWorkflowTask);


                }
                //next node
                while (sequenceFlowListsNext.hasNext()) {
                    FlowNode nextNode = sequenceFlowListsNext.next();
                    String nextNodeId = nextNode.getId();
                    if (nextNodeId.contains("Task")) {
                        newWorkflowTask.setPostTask(nextNodeId);

                    } else if (nextNodeId.contains("ExclusiveGateway")) {
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(nextNodeId);
                        List<FlowNode> nextNodesCollection = gateway.getSucceedingNodes().list();
//                        Iterator<SequenceFlow> prevFlowCollection = gateway.getOutgoing().iterator();
                        String postTask = "";
                        for(FlowNode node: nextNodesCollection){
                            postTask += node.getId();
                            postTask += "-";
                            System.out.println("POST taskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk" + postTask);
                        }
                        newWorkflowTask.setPostTask(postTask);
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

                            List<Subcriber> subcribers = groupContactRepository
                                    .findSubcriberByGroupContactId(workflowGroupContact.getGroupContact().getId());
                            for (Subcriber subcriber : subcribers) {
//                                List<Task> tasks = workflow.getTasks();
                                Task firstTask = taskRepository.findTaskByPreTaskAndWorkflow("", workflow);
                                if (firstTask.getType() == "appointment") {
                                    Appointment firstApp = appointmentRepository.findAppointmentByName(firstTask.getName());
                                    if (appointmentSubcriberRepository.checkSend(firstApp.getId(), subcriber.getEmail()) == true) {
//                                        List<String> postsCode = Arrays.asList(firstTask.getPostTask().split("-"));
//                                        for (String code : postsCode) {
//                                            runTask();
//                                        }//array of post code
                                      runTask(firstTask,workflow,subcriber);
                                    } else {
                                        mailService.sendAppointment(firstApp.getSender(),firstApp.getFromMail(),subcriber.getEmail(),firstApp.getSubject(), firstApp.getBody());
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

    public void runTask(Task firstTask,Workflow workflow, Subcriber subcriber){
         //clicked yes : 1
//        clicked no : 0
//                opened yes : 2
//                opened no : 3

        int clicked = 0;
        Appointment firstAppointment ;
        if(firstTask.getType()== "appointment"){
            firstAppointment = appointmentRepository.findAppointmentByName(firstTask.getName());
            if(appointmentSubcriberRepository.checkConfirmAppointment(firstAppointment.getId(), subcriber.getEmail()) == 1){
                clicked = 1;
            } else {
                clicked = 0;
            }
            if(appointmentSubcriberRepository.checkSend(firstAppointment.getId(), subcriber.getEmail())){
                List<String> postsCode = Arrays.asList(firstTask.getPostTask().split("-"));
                if (postsCode == null || postsCode.isEmpty())
                {
                    return;
                }
                for(String code : postsCode)
                {
                    Task tmp = taskRepository.findTaskByPostTaskAndWorkflow(code, workflow);
                    if(tmp.getGateway() == "Clicked ?yes" && clicked == 1){
                        runTask(tmp,workflow,subcriber);

                    } else if(tmp.getGateway() == "Clicked ?no" && clicked == 0){
                        runTask(tmp,workflow,subcriber);
                    } else {
                        return;
                    }

                }//array of post code

            } else{
                firstAppointment = appointmentRepository.findAppointmentByName(firstTask.getName());
                mailService.sendAppointment(firstAppointment.getSender(),firstAppointment.getFromMail(),subcriber.getEmail(),firstAppointment.getSubject(),firstAppointment.getBody());
            }
        }
        }
}
