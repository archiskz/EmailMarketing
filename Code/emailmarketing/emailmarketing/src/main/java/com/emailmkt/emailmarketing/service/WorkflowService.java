package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Workflow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

//    Workflow getWorkflowByUsername(String username);
//    List<Account> getAllAccountsByCucountAllByauthorityIdstomer();
//Workflow loginForCustomer(String username, String password);

}
