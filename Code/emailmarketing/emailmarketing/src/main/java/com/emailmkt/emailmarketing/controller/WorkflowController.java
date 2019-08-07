package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.ViewWorkflowDTO;
import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Workflow;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.repository.WorkflowRepository;
import com.emailmkt.emailmarketing.service.WorkflowService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WorkflowController {


    @Autowired
    private final WorkflowRepository workflowRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(WorkflowController.class);
    @Autowired
    WorkflowService workflowService;
//    SubcriberService subcriberService;

    @Autowired
    SubcriberRepository subcriberRepository;

    @Autowired
    public WorkflowController(WorkflowRepository workflowRepository) {
        this.workflowRepository = workflowRepository;
    }




    @ApiOperation(value = "Create Workflow")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value="workflow/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createCampaignWithoutTemplate(@RequestBody WorkflowDTO workflowDTO) {

        boolean flag = workflowService.createWorkflow(workflowDTO);


        return ResponseEntity.status(CREATED).body("aaa");

    }


    @GetMapping("/workflows")
    Iterable<Workflow> getAll() {
        return workflowRepository.findAll();
    }


    @GetMapping("workflow/task")
    public List<String> findSubcriberInTask(@RequestParam(value = "workflowId")int workflowId,@RequestParam(value = "shapeId")String shapeId) {
        List<String> sucribers = workflowService.findSubcriberInTask(workflowId,shapeId);
        return sucribers;
    }

    @GetMapping("workflow/pretask")
    public List<String> findSubcriberInComing(@RequestParam(value = "workflowId")int workflowId,@RequestParam(value = "shapeId")String shapeId) {
        List<String> sucribers = workflowService.findSubcriberIncoming(workflowId,shapeId);
        return sucribers;
    }

    @GetMapping("/workflow/view")
    public ResponseEntity<ViewWorkflowDTO> getWorkflowDTO(@RequestParam(value = "workflowId")int workflowId,@RequestParam(value = "shapeId")String shapeId) {
        ViewWorkflowDTO vms = workflowService.viewWorkflowDTO(workflowId,shapeId);
        return new ResponseEntity<ViewWorkflowDTO>(vms, HttpStatus.OK);
    }





    }

