package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Workflow;

import java.util.List;


public interface WorkflowService {
    boolean createWorkflow(WorkflowDTO workflowDTO);

    List<Workflow> getAllWorkflows();

//    Workflow editWorkflow(Workflow workflow);

//    List<Account> getAllAccountsByStaff();

    Workflow getWorkflowById(int id);

//    List<Workflow> getAllWorkflowByauthorityId(int authorityId);

//    Workflow updateWorkflow(Workflow workflow);

//    int countTotalUserAccount(int authorityId);

//    Workflow createNewWorkflow(Workflow workflow);

    public void runWorkflow();
//    Workflow getWorkflowByUsername(String username);
//    List<Account> getAllAccountsByCucountAllByauthorityIdstomer();
//Workflow loginForCustomer(String username, String password);

}
