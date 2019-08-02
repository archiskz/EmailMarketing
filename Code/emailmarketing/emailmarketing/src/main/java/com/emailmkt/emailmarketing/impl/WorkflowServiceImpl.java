package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.*;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.MailService;
import com.emailmkt.emailmarketing.service.WorkflowService;
import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.instance.FlowElement;
import org.camunda.bpm.model.bpmn.instance.FlowNode;
import org.camunda.bpm.model.bpmn.instance.Process;
import org.camunda.bpm.model.bpmn.instance.SequenceFlow;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

//import com.emailmkt.emailmarketing.model.Task;
//import com.emailmkt.emailmarketing.repository.TaskRepository;
@Transactional
@Service
public class WorkflowServiceImpl implements WorkflowService {

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    MailService mailService;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    CampaignService campaignService;

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    AppointmentSubcriberRepository appointmentSubcriberRepository;
    @Autowired
    CampaignSubcriberRepository campaignSubcriberRepository;

    @Autowired
    CampaignGroupContactRepository campaignGroupContactRepository;

    @Autowired
    GroupContactRepository groupContactRepository;
    @Autowired
    TaskRepository taskRepository;

    @Override
    public boolean createWorkflow(WorkflowDTO workflowDTO) {
        Workflow newWorkflow = new Workflow();
        newWorkflow.setName(workflowDTO.getWorkflowName());
        newWorkflow.setModel(workflowDTO.getWtWorkflowDTOS());
        newWorkflow.setStatus("Starting");
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
                newWorkflowTask.setShapeId(shapeId);
                //set task Type
                if (shapeId.contains("SendTask")) {
                    newWorkflowTask.setType("campaign");
                    Campaign campaignTask = campaignRepository.findByName(name);
                    int campaignOrAppId = campaignService.copyCampaign(campaignTask.getId(), newWorkflow.getId());
                    newWorkflowTask.setCampaignAppointment(campaignOrAppId);
                } else if (shapeId.contains("BusinessRule")) {
                    newWorkflowTask.setType("appointment");
                    Appointment appointmentTask = appointmentRepository.findAppointmentByName(name);
                    int campaignOrAppId = appointmentService.copyAppointment(appointmentTask.getId(), newWorkflow.getId());
                    newWorkflowTask.setCampaignAppointment(campaignOrAppId);
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
                        for (FlowNode node : nextNodesCollection) {
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
        System.out.println("RUN WORK FLOW");
        ExecutorService executor = Executors.newFixedThreadPool(30);
        List<Workflow> workflows = workflowRepository.findWorkflowByStatus();
        if (workflows != null) {
            for (Workflow workflow : workflows) {
                System.out.println("-----------------------------------------------------WORK FLOW:");
                System.out.println("-----------------------------------------------------WORK FLOW:" + workflow.getName());
                executor.execute(new Runnable() {
                    @Override
                    public void run() {
                        //get all subcriber
                        for (WorkflowGroupContact workflowGroupContact : workflow.getWorkflowGroupContacts()) {
                            System.out.println("------------------------------------------WOrkflow group contact----------------------");
                            List<Subcriber> subcribers = groupContactRepository
                                    .findSubcriberByGroupContactId(workflowGroupContact.getGroupContact().getId());
                            for (Subcriber subcriber : subcribers) {

                                System.out.println("-----------------------------------------------------SUBCRIBER:" + subcriber.getEmail());
//                                List<Task> tasks = workflow.getTasks();
                                Task firstTask = taskRepository.findTaskByPreTaskAndWorkflow_Id(null, workflow.getId());
                                System.out.println("-------------------------first Task Type" + workflow.getId());
                                System.out.println("-------------------------first Task Type" + firstTask.getName());
                                if (firstTask.getType().equalsIgnoreCase("appointment")) {
                                    Appointment firstApp = appointmentRepository.findAppointmentById(firstTask.getCampaignAppointment());
                                    System.out.println("First APP -----------------" + firstApp.getName());
                                    System.out.println(appointmentSubcriberRepository.checkSend(firstApp.getId(), subcriber.getEmail()));
                                    if (appointmentSubcriberRepository.checkSend(firstApp.getId(), subcriber.getEmail()) == true) {
                                        System.out.println("T DANG O DAY NE ---------------------------------------");
                                        runTask(firstTask, workflow, subcriber);
                                    } else {
                                        System.out.println("-----------------------------------------------------SENDING:");
                                        AppointmentSubcriber appointmentSubcriber = appointmentSubcriberRepository.changeConfirmSend(firstApp.getId(), subcriber.getEmail());
                                        appointmentSubcriber.setSend(true);
                                        appointmentSubcriberRepository.save(appointmentSubcriber);
                                        mailService.sendAppointment(firstApp.getSender(), firstApp.getFromMail(), subcriber.getEmail(), firstApp.getSubject(), firstApp.getBody());

                                    }
                                } else if (firstTask.getType().equalsIgnoreCase(("campaign"))) {
                                    Campaign firstApp = campaignRepository.findCampaignById(firstTask.getCampaignAppointment());
                                    System.out.println("First CAMPAIGN -----------------" + firstApp.getName());
                                    if (campaignSubcriberRepository.checkSend(firstApp.getId(), subcriber.getEmail()) == true) {
                                        System.out.println("Gửi rồi nha ");
                                        runTask(firstTask, workflow, subcriber);
                                        System.out.println(firstTask.getName() + workflow.getName() + subcriber.getLastName());
                                    } else {
                                        System.out.println("-----------------------------------------------------SENDING:");
                                        CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(firstApp.getId(), subcriber.getEmail());
                                        campaignSubcriber.setSend(true);
                                        campaignSubcriberRepository.save(campaignSubcriber);
                                        mailService.sendAppointment(firstApp.getSender(), firstApp.getFromMail(), subcriber.getEmail(), firstApp.getSubject(), firstApp.getContent());

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

    public void runTask(Task firstTask, Workflow workflow, Subcriber subcriber) {
        //clicked yes : 1
//        clicked no : 0
//                opened yes : 2
//                opened no : 3
        System.out.println("RUN TASK NE ---------------------------------------------------------" + firstTask.getName() + firstTask.getType());
        int clicked = 0;
        ;
        if (firstTask.getType().equalsIgnoreCase("appointment")) {
            Appointment firstAppointment = appointmentRepository.findAppointmentById(firstTask.getCampaignAppointment());
            System.out.println("CHECK---------------------------------" + appointmentSubcriberRepository.checkConfirmAppointment(firstAppointment.getId(), subcriber.getEmail()));
            if (appointmentSubcriberRepository.checkConfirmAppointment(firstAppointment.getId(), subcriber.getEmail()) == true) {
                clicked = 1;
            } else {
                clicked = 0;
            }
            if (appointmentSubcriberRepository.checkSend(firstAppointment.getId(), subcriber.getEmail()) == true) {
                List<String> postsCode = new ArrayList<>();
                try {
                    postsCode = Arrays.asList(firstTask.getPostTask().split("-"));
                } catch (Exception e) {

                }

                if (postsCode == null || postsCode.isEmpty()) {
                    return;
                } else {
                    for (int i = 0; i < postsCode.size(); i++) {
                        System.out.println("POST CODE--------------------------------------------------" + postsCode.get(i) + "CLicked" + clicked);
                        Task tmp = taskRepository.findTaskByShapeIdAndWorkflow_Id(postsCode.get(i), workflow.getId());
                        System.out.println("GATE WAY-------------------------------" + tmp.getGateway());

                        if ((tmp.getGateway().equalsIgnoreCase("Clicked ?yes") && clicked == 1) ||
                                (tmp.getGateway().equalsIgnoreCase("Clicked ?no") && clicked == 0)
                        ) {
                            System.out.println("--------------------------------------------------------Clicked ?No");
                            Appointment tmpAppointment = appointmentRepository.findAppointmentById(tmp.getCampaignAppointment());
                            AppointmentSubcriber appointmentSubcriber = appointmentSubcriberRepository.changeConfirmSend(tmpAppointment.getId(), subcriber.getEmail());
                            if (appointmentSubcriber.isSend() == false) {
                                appointmentSubcriber.setSend(true);
                                appointmentSubcriberRepository.save(appointmentSubcriber);
                                mailService.sendAppointment(tmpAppointment.getSender(), tmpAppointment.getFromMail(), subcriber.getEmail(), tmpAppointment.getSubject(), tmpAppointment.getBody());
                            }
                            runTask(tmp, workflow, subcriber);
                        } else {
//                        runTask(tmp,workflow,subcriber);
//                        return;
                        }

                    }//array of post code
                }


            } else {
                System.out.println("CHUA SEND NE --------------------------------------");

                firstAppointment = appointmentRepository.findAppointmentById(firstTask.getCampaignAppointment());
                AppointmentSubcriber appointmentSubcriber1 = appointmentSubcriberRepository.changeConfirmSend(firstAppointment.getId(), subcriber.getEmail());
                if (appointmentSubcriber1.isSend() == false) {
                    appointmentSubcriber1.setSend(true);
                    appointmentSubcriberRepository.save(appointmentSubcriber1);
                    mailService.sendAppointment(firstAppointment.getSender(), firstAppointment.getFromMail(), subcriber.getEmail(), firstAppointment.getSubject(), firstAppointment.getBody());
                }
//                mailService.sendAppointment(firstAppointment.getSender(),firstAppointment.getFromMail(),subcriber.getEmail(),firstAppointment.getSubject(),firstAppointment.getBody());
            }
            ///IF CAMPAIGN
        } else if (firstTask.getType().equalsIgnoreCase("campaign")) {
            Campaign firstCampaign = campaignRepository.findCampaignById(firstTask.getCampaignAppointment());
//            System.out.println("CHECK---------------------------------" +appointmentSubcriberRepository.checkConfirmAppointment(firstCampaign.getId(), subcriber.getEmail()).toString());
            if (campaignSubcriberRepository.checkConfirmCampaign(firstCampaign.getId(), subcriber.getEmail()) == true) {
                clicked = 1;
            } else {
                clicked = 0;
            }
            if (campaignSubcriberRepository.checkSend(firstCampaign.getId(), subcriber.getEmail()) == true) {
                List<String> postsCode = new ArrayList<>();
                try {
                    postsCode = Arrays.asList(firstTask.getPostTask().split("-"));
                } catch (Exception e) {

                }

                if (postsCode == null || postsCode.isEmpty()) {
                    return;
                } else {
                    for (int i = 0; i < postsCode.size(); i++) {
                        System.out.println("POST CODE--------------------------------------------------" + postsCode.get(i) + "CLicked" + clicked);
                        Task tmp = taskRepository.findTaskByShapeIdAndWorkflow_Id(postsCode.get(i), workflow.getId());
                        System.out.println("GATE WAY-------------------------------" + tmp.getGateway());

                        if ((tmp.getGateway().equalsIgnoreCase("Clicked ?yes") && clicked == 1) ||
                                (tmp.getGateway().equalsIgnoreCase("Clicked ?no") && clicked == 0)
                        ) {
                            if (tmp.getType().equalsIgnoreCase("appointment")) {
                                System.out.println("--------------------------------------------------------Clicked ?No");
                                Appointment tmpAppointment = appointmentRepository.findAppointmentById(tmp.getCampaignAppointment());
                                AppointmentSubcriber appointmentSubcriber = appointmentSubcriberRepository.changeConfirmSend(tmpAppointment.getId(), subcriber.getEmail());
                                if (appointmentSubcriber.isSend() == false) {
                                    appointmentSubcriber.setSend(true);
                                    appointmentSubcriberRepository.save(appointmentSubcriber);
                                    mailService.sendAppointment(tmpAppointment.getSender(), tmpAppointment.getFromMail(), subcriber.getEmail(), tmpAppointment.getSubject(), tmpAppointment.getBody());
                                }
                                runTask(tmp, workflow, subcriber);
                            } else {
                                System.out.println("--------------------------------------------------------Clicked ?No");
                                Campaign tmpCampaign = campaignRepository.findCampaignById(tmp.getCampaignAppointment());
                                CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(tmpCampaign.getId(), subcriber.getEmail());
                                if (campaignSubcriber.isSend() == false) {
                                    campaignSubcriber.setSend(true);
                                    campaignSubcriberRepository.save(campaignSubcriber);
                                    mailService.sendAppointment(tmpCampaign.getSender(), tmpCampaign.getFromMail(), subcriber.getEmail(), tmpCampaign.getSubject(), tmpCampaign.getContent());
                                }
                                runTask(tmp, workflow, subcriber);
                            }
                        } else {
//                        runTask(tmp,workflow,subcriber);
//                        return;
                        }

                    }//array of post code
                }


            } else {
                System.out.println("CHUA SEND NE --------------------------------------");

                firstCampaign = campaignRepository.findCampaignById(firstTask.getCampaignAppointment());
                CampaignSubcriber campaignSubcriber1 = campaignSubcriberRepository.changeConfirmSend(firstCampaign.getId(), subcriber.getEmail());
                if (campaignSubcriber1.isSend() == false) {
                    campaignSubcriber1.setSend(true);
                    campaignSubcriberRepository.save(campaignSubcriber1);
                    mailService.sendAppointment(firstCampaign.getSender(), firstCampaign.getFromMail(), subcriber.getEmail(), firstCampaign.getSubject(), firstCampaign.getContent());
                }
//                mailService.sendAppointment(firstAppointment.getSender(),firstAppointment.getFromMail(),subcriber.getEmail(),firstAppointment.getSubject(),firstAppointment.getBody());
            }
        }
    }
    

}
