package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Task;
import com.emailmkt.emailmarketing.model.Workflow;
import com.emailmkt.emailmarketing.model.WorkflowTask;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.TaskRepository;
import com.emailmkt.emailmarketing.repository.WorkflowRepository;
import com.emailmkt.emailmarketing.service.WorkflowService;
import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.instance.*;
import org.camunda.bpm.model.bpmn.instance.Process;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

@Service
public class WorkflowServiceImpl implements WorkflowService {

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TaskRepository workflowTaskRepository;

    @Override
    public boolean createWorkflow(WorkflowDTO workflowDTO) {
        Workflow newWorkflow = new Workflow();
        newWorkflow.setName(workflowDTO.getWorkflowName());
//        newWorkflow.setWorkflowTasks(workflowTaskList);
        workflowRepository.save(newWorkflow);
        List<WorkflowTask> workflowTaskList = new ArrayList<>();

        String bpmnString = workflowDTO.getWtWorkflowDTOS();
        InputStream inputStream = new ByteArrayInputStream(bpmnString.getBytes(Charset.forName("UTF-8"))) ;
        org.camunda.bpm.model.bpmn.BpmnModelInstance modelInstance = Bpmn.readModelFromStream(inputStream);
        Process process = (Process) modelInstance.getModelElementById("Process_1");
//            System.out.println(format(process.getFlowElements()));
        Collection<FlowElement> elements = process.getFlowElements();
        Iterator<FlowElement> eList = elements.iterator();
        int i = 0;
        while(eList.hasNext()){
            String shapeId = eList.next().getId();
            if(shapeId.contains("Task")){
                Task task = new Task();
                String name = modelInstance.getModelElementById(shapeId).getAttributeValue("name");
                task.setName(name);
                task.setShape_id(shapeId);
                if(shapeId.contains("UserTask")){
                    task.setType("form");
                }else if (shapeId.contains("SendTask")){
                    task.setType("email");
                } else {
                    task.setType("appointment");
                }
                taskRepository.save(task);
                List<WorkflowTask> workflowTasksList = new ArrayList<>();
                org.camunda.bpm.model.bpmn.instance.Task taskModel = (org.camunda.bpm.model.bpmn.instance.Task) modelInstance.getModelElementById(shapeId);
                Collection<FlowNode> sequenceFlowsPrevious = taskModel.getPreviousNodes().list();
                Iterator<FlowNode> sequenceFlowListsPrevious = sequenceFlowsPrevious.iterator();
                while(sequenceFlowListsPrevious.hasNext()){
                    WorkflowTask newWorkflowTask = new WorkflowTask();
                    newWorkflowTask.setTask(task);
                    newWorkflowTask.setWorkflow(newWorkflow);
                    String previousNodeId = sequenceFlowListsPrevious.next().getId();
                    if(previousNodeId.contains("Task")){
                        newWorkflowTask.setPreTask(previousNodeId);

                        workflowTaskList.add(newWorkflowTask);
                    } else if(previousNodeId.contains("ExclusiveGateway")){
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(previousNodeId);
                        List<FlowNode> prevNodesCollection = gateway.getPreviousNodes().list();
                        Iterator<SequenceFlow> prevFlowCollection = gateway.getOutgoing().iterator();
                      for(int j = 0; j <= prevNodesCollection.size(); j ++){
                          FlowNode conditionNode = prevNodesCollection.get(i);
                          newWorkflowTask.setGateway(conditionNode.getName());
                          newWorkflowTask.setPreTask(conditionNode.getId());

                          workflowTaskList.add(newWorkflowTask);
                      }

                    }
//                    S save = workflowTaskRepository.save(newWorkflowTask);
                }
                Collection<FlowNode> sequenceFlowsNext = taskModel.getSucceedingNodes().list();
                Iterator<FlowNode> sequenceFlowListsNext = sequenceFlowsNext.iterator();
                while(sequenceFlowListsNext.hasNext()){
                    WorkflowTask newWorkflowTask = new WorkflowTask();
                    newWorkflowTask.setTask(task);
                    newWorkflowTask.setWorkflow(newWorkflow);
                    String nextNodeId = sequenceFlowListsNext.next().getId();
                    if(nextNodeId.contains("Task")){
                        newWorkflowTask.setPostTask(nextNodeId);
                        workflowTaskList.add(newWorkflowTask);
                    } else if(nextNodeId.contains("ExclusiveGateway")){
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(nextNodeId);
                        List<FlowNode> nextNodesCollection = gateway.getSucceedingNodes().list();
                        Iterator<SequenceFlow> nextFlowCollection = gateway.getIncoming().iterator();
                        for(int j = 0; j <= nextNodesCollection.size(); j ++){
                            FlowNode conditionNode = nextNodesCollection.get(i);
                            newWorkflowTask.setGateway(conditionNode.getName());
                            newWorkflowTask.setPostTask(conditionNode.getId());
                            workflowTaskList.add(newWorkflowTask);
                        }

                    }

                }




            }
        }
//        while(eList.hasNext()) {
//            String value = eList.next().getId();
//            if(value.contains("StartEvent")){
////                System.out.println("Start now");
//            }else if(value.contains("Task")){
//
//                Task newTask = new Task();
//                org.camunda.bpm.model.bpmn.instance.Task task = (org.camunda.bpm.model.bpmn.instance.Task) modelInstance.getModelElementById(value);
//
////                newTask.setShape_id("1");
//                newTask.setShape_id(value);
//
//                newTask.setName(task.getName());
//                if(value.contains("SendTask")){
//                    newTask.setType("campaign");
//                }else if(value.contains("BusinessRule")){
//                    newTask.setType("appointment");
//                }else {
//                    newTask.setType("form");
//                }
//                Collection<FlowNode> sequenceFlows = task.getSucceedingNodes().list();
//                Collection<FlowNode> sequenceFlowsPre = task.getPreviousNodes().list();
//                Iterator<FlowNode> sequenceLists = sequenceFlows.iterator();
//                Iterator<FlowNode> sequenceListsPrev = sequenceFlowsPre.iterator();
//
//                while(sequenceLists.hasNext()){
//                    FlowNode GatewayNode = sequenceLists.next();
//
////                    String nodeId = .getId();
//                    System.out.println("next" + task.getId() +"--" + task.getName() +"----"+GatewayNode.getId());
//                    System.out.println(newTask.getId());
//                    if(GatewayNode.getId().contains("ExclusiveGateway")){
//
//                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = (org.camunda.bpm.model.bpmn.instance.ExclusiveGateway) modelInstance.getModelElementById(GatewayNode.getId());
//                        Collection<FlowNode> nextNodes = gateway.getSucceedingNodes().list();
//                        Iterator<FlowNode> nextNodeLists = nextNodes.iterator();
//                        while(nextNodeLists.hasNext()){
//                            FlowNode conditionNode = nextNodeLists.next();
//                            WorkflowTask newWfTask = new WorkflowTask();
//                            newWfTask.setTask(newTask);
//                            newWfTask.setGateway(GatewayNode.getName());
//                            newWfTask.setPostTask(conditionNode.getId());
//                            workflowTaskList.add(newWfTask);
//                        }
//                    } else {
////                        FlowNode conditionNode = nextNodeLists.next();
//                        WorkflowTask newWfTask = new WorkflowTask();
//                        newWfTask.setTask(newTask);
////                        newWfTask.setCondition(GatewayNode.getName());
//                        newWfTask.setPostTask(GatewayNode.getId());
////                        workflowTaskList.add(newWfTask);
//                    }
//                }
//                while(sequenceListsPrev.hasNext()){
//                    FlowNode GatewayNode = sequenceListsPrev.next();
//                    System.out.println("prev" + task.getId() +"--" + task.getName() +"----"+GatewayNode.getId());
//                    if(GatewayNode.getId().contains("ExclusiveGateway")){
//                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = (org.camunda.bpm.model.bpmn.instance.ExclusiveGateway) modelInstance.getModelElementById(GatewayNode.getId());
//                        Collection<FlowNode> prevNodes = gateway.getPreviousNodes().list();
//                        Iterator<FlowNode> prevNodeLists = prevNodes.iterator();
//                        while(prevNodeLists.hasNext()){
//                            FlowNode conditionNode = prevNodeLists.next();
//                            WorkflowTask newWfTask = new WorkflowTask();
//                            newWfTask.setTask(newTask);
//                            newWfTask.setGateway(GatewayNode.getName());
//                            newWfTask.setPreTask(conditionNode.getId());
//                            workflowTaskList.add(newWfTask);
//                        }
//                    }
//                    else {
//                        WorkflowTask newWfTask = new WorkflowTask();
//                        newWfTask.setTask(newTask);
////                        newWfTask.setCondition(GatewayNode.getName());
//                        newWfTask.setPreTask(GatewayNode.getId());
//                        workflowTaskList.add(newWfTask);
//                    }
//                }
//
//            }
//            System.out.println(value + "--" + i);
//
//            i++;
//        }
//


//        newWorkflow.setWorkflowTasks(workflowTaskList);
//
//        Workflow checkExistedWorkflow = workflowRepository.findByName(newWorkflow.getName());
//        if (checkExistedWorkflow != null) {
//            return false;
//        }
//
//        newWorkflow.setCreatedTime(LocalDateTime.now().toString());
//        newWorkflow.setName(newWorkflow.getName());
//
//        workflowRepository.save(newWorkflow);


        return true;
    }

    @Override
    public List<Workflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }


//    @Override
//    public List<Account> getAllAccountsByStaff() {
//        return accountRepository.findAllByauthorityIdGreaterThanEqual(3);
//    }
//
//    @Override
//    public List<Account> getAllAccountsByCustomer() {
//        return accountRepository.findAllByauthorityIdGreaterThanEqual(2);
//    }

    @Override
    public Workflow getWorkflowById(int id) {
        return workflowRepository.findWorkflowById(id);
    }

//    @Override
//    public List<Account> getAllAccountByauthorityId(int authorityId) {
//        return accountRepository.findAllByauthorityIdOrderByCreatedTimeDesc(authorityId);
//    }


//    @Override
//    public int countTotalUserAccount(int authorityId) {
//        return accountRepository.countAllByauthorityId(authorityId);
//    }



}
