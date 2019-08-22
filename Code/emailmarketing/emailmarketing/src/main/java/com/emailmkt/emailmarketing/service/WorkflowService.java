package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.ViewWorkflowDTO;
import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Workflow;

import java.util.List;


public interface WorkflowService {
    boolean createWorkflow(WorkflowDTO workflowDTO, Account account);

    List<Workflow> getAllWorkflows();

//    Workflow editWorkflow(Workflow workflow);

//    List<Account> getAllAccountsByStaff();

    Workflow getWorkflowById(int id);

    List<String> findSubcriberInTask(int workflowId,String shapeId);

    List<String> findSubcriberIncoming(int workflowId,String shapeId);

    public void runWorkflow();

    void pauseWorkflow(int id);

    void restartWorkflow(int id);

    ViewWorkflowDTO viewWorkflowDTO(int workflowId, String shapeId);


//    Workflow getWorkflowByUsername(String username);
//    List<Account> getAllAccountsByCucountAllByauthorityIdstomer();
//Workflow loginForCustomer(String username, String password);

}
