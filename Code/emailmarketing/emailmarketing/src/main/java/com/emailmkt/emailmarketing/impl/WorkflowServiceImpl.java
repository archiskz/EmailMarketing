package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.Config.NoDuplicates;
import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Task;
import com.emailmkt.emailmarketing.model.Workflow;
import com.emailmkt.emailmarketing.model.WorkflowTask;
import com.emailmkt.emailmarketing.repository.TaskRepository;
import com.emailmkt.emailmarketing.repository.WorkflowRepository;
import com.emailmkt.emailmarketing.repository.WorkflowTaskRepository;
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
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
        newWorkflow.setModel(workflowDTO.getWtWorkflowDTOS());
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
        PriorityQueue<Task> workflowTaskQueue = new NoDuplicates<Task>();
        if(workflows != null){
            for (final Workflow workflow : workflows){
                executor.execute(new Runnable() {
                    @Override
                    public void run() {
                        List<WorkflowTask> workflowTasks = workflowTaskRepository.findAllWorkflowByStatus(workflow.getId());
                        if(workflowTasks != null){
                            for(WorkflowTask workflowTask :workflowTasks ){
                                String preTask = "";
                                String postTask="";
                                String shapeId ="";
                                if(workflowTask.getPreTask()==null){
                                    List<WorkflowTask>workflowTasks1 = workflowTaskRepository.findAllByTaskId(workflowTask.getTask().getId());
                                    for (WorkflowTask workflowTask1 : workflowTasks1){
                                        if(workflowTask1.getPreTask()==null){
                                            workflowTaskQueue.add(workflowTask1.getTask());

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
