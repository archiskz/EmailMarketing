package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Task;
import com.emailmkt.emailmarketing.model.Workflow;
import com.emailmkt.emailmarketing.model.WorkflowTask;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.TaskRepository;
import com.emailmkt.emailmarketing.repository.WorkflowRepository;
import com.emailmkt.emailmarketing.repository.WorkflowTaskRepository;
import com.emailmkt.emailmarketing.service.AccountService;
import com.emailmkt.emailmarketing.service.WorkflowService;
import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.bpmn.instance.*;
import org.camunda.bpm.model.bpmn.instance.Process;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    WorkflowTaskRepository workflowTaskRepository;

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
        while(eList.hasNext()) {
            String shapeId = eList.next().getId();
            if (shapeId.contains("Task")) {
                Task task = new Task();
                String name = modelInstance.getModelElementById(shapeId).getAttributeValue("name");
                task.setName(name);
                task.setShape_id(shapeId);
                if (shapeId.contains("UserTask")) {
                    task.setType("form");
                } else if (shapeId.contains("SendTask")) {
                    task.setType("email");
                } else {
                    task.setType("appointment");
                }
                taskRepository.save(task);
                List<WorkflowTask> workflowTasksList = new ArrayList<>();
                org.camunda.bpm.model.bpmn.instance.Task taskModel = (org.camunda.bpm.model.bpmn.instance.Task) modelInstance.getModelElementById(shapeId);
                Collection<FlowNode> sequenceFlowsPrevious = taskModel.getPreviousNodes().list();
                Iterator<FlowNode> sequenceFlowListsPrevious = sequenceFlowsPrevious.iterator();
                while (sequenceFlowListsPrevious.hasNext()) {
                    WorkflowTask newWorkflowTask = new WorkflowTask();
                    newWorkflowTask.setTask(task);
                    newWorkflowTask.setWorkflow(newWorkflow);
                    String previousNodeId = sequenceFlowListsPrevious.next().getId();
                    if (previousNodeId.contains("Task")) {
                        newWorkflowTask.setPreTask(previousNodeId);

                        workflowTaskList.add(newWorkflowTask);
                    } else if (previousNodeId.contains("ExclusiveGateway")) {
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(previousNodeId);
                        List<FlowNode> prevNodesCollection = gateway.getPreviousNodes().list();
                        Iterator<SequenceFlow> prevFlowCollection = gateway.getOutgoing().iterator();
                        for (int j = 0; j <= prevNodesCollection.size(); j++) {
                            FlowNode conditionNode = prevNodesCollection.get(i);
//                          newWorkflowTask.setGateway(conditionNode.getName());
                            newWorkflowTask.setPreTask(conditionNode.getId());

                            workflowTaskList.add(newWorkflowTask);
                        }


                    }
                    workflowTaskRepository.save(newWorkflowTask);

                }
                Collection<FlowNode> sequenceFlowsNext = taskModel.getSucceedingNodes().list();
                Iterator<FlowNode> sequenceFlowListsNext = sequenceFlowsNext.iterator();
                while (sequenceFlowListsNext.hasNext()) {

                    String nextNodeId = sequenceFlowListsNext.next().getId();
                    if (nextNodeId.contains("Task")) {
                        WorkflowTask newWorkflowTask = new WorkflowTask();
                        newWorkflowTask.setTask(task);
                        newWorkflowTask.setWorkflow(newWorkflow);
                        newWorkflowTask.setPostTask(nextNodeId);
//                        workflowTaskRepository.save(newWorkflowTask);
                        workflowTaskList.add(newWorkflowTask);
                        workflowTaskRepository.save(newWorkflowTask);
                    } else if (nextNodeId.contains("ExclusiveGateway")) {
                        org.camunda.bpm.model.bpmn.instance.ExclusiveGateway gateway = modelInstance.getModelElementById(nextNodeId);

                        Collection<FlowNode> nextNodesCollection = gateway.getSucceedingNodes().list();
                        Iterator<FlowNode> nextNodeLists = nextNodesCollection.iterator();
                        Iterator<SequenceFlow> nextFlowCollection = gateway.getIncoming().iterator();
//                        for(int j = 0; j <= nextNodesCollection.size(); j ++){
//                            FlowNode conditionNode = nextNodesCollection.get(i);
//                            newWorkflowTask.setGateway(gateway.getName());
//                            newWorkflowTask.setPostTask(conditionNode.getId());
//                            System.out.println(conditionNode.getId());
//                            workflowTaskList.add(newWorkflowTask);
//                        }
                        while (nextNodeLists.hasNext()) {
                            WorkflowTask newWorkflowTask = new WorkflowTask();
                            newWorkflowTask.setTask(task);
                            newWorkflowTask.setWorkflow(newWorkflow);
                            FlowNode conditionNode = nextNodeLists.next();
                            System.out.println(conditionNode.getName() + "---" + conditionNode.getId());

                            Collection<SequenceFlow> f1 = conditionNode.getIncoming();
                            Collection<SequenceFlow> f2 = gateway.getOutgoing();
                            f1.containsAll(f2);
                            SequenceFlow conditionFlow = f1.iterator().next();
                            newWorkflowTask.setGateway(gateway.getName() + " " + conditionFlow.getName());
                            newWorkflowTask.setPostTask(conditionNode.getId());
                            workflowTaskList.add(newWorkflowTask);
                            workflowTaskRepository.save(newWorkflowTask);
                        }

                    }


                }
            }


        }
        return true;
    }

    @Override
    public List<Workflow> getAllWorkflows() {
        System.out.println("toi day chưa hihihi");
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
