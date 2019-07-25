package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.CampaignFullDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.dto.WorkflowDTO;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.model.Workflow;
import com.emailmkt.emailmarketing.repository.CampaignRepository;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.repository.WorkflowRepository;
import com.emailmkt.emailmarketing.service.WorkflowService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.camunda.bpm.model.bpmn.instance.*;
import org.camunda.bpm.model.bpmn.instance.Process;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.camunda.bpm.model.bpmn.Bpmn;
import org.camunda.bpm.model.xml.instance.ModelElementInstance;
import org.camunda.bpm.model.xml.type.ModelElementType;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://45.77.172.104:3000"})
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

    static class MailAndCampaign {
        public MailObjectDTO mailObjectDTO;
        public CampaignDTO campaignDTO;
    }

    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }

    @ApiOperation(value = "Create Workflow")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value="workflow/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createCampaignWithoutTemplate(@RequestBody WorkflowDTO workflowDTO) {

        boolean flag = workflowService.createWorkflow(workflowDTO);


//        boolean flag = workflowService.createWorkflow(mailAndCampaign.mailObjectDTO,mailAndCampaign.campaignDTO);
//        if (flag == false) {
//            return ResponseEntity.status(CONFLICT).body("Campaign Existed");
//        }
//        Campaign temp = campaignRepository.findByName(mailAndCampaign.campaignDTO.getCampaignName());
        return ResponseEntity.status(CREATED).body("aaa");

    }


    @GetMapping("/workflows")
    public List<Workflow> getAllWorkflows() {
        return workflowService.getAllWorkflows();
    }

//    @PostMapping("/template/search/{searchValue}")
//    public List<Template> searchByNameOrType(@PathVariable(value = "searchValue") String searchValue) {
//        return templateService.searchByNameorType(searchValue);
//    }

//    @GetMapping(value="campaign/{id}")
//    Campaign read(@PathVariable int id) {
//        return campaignRepository.findById(id)
//        .orElseThrow(() -> new RuntimeException("Not found"));
//    }

//    @GetMapping("campaign/{id}")
//    public CampaignFullDTO getCampaignById(@PathVariable(value = "id") int id) {
//        return campaignService.getCampaginById(id);
//    }
//
//    @PutMapping("campaign/edit/{id}")
//    public ResponseEntity updateCampaign(@RequestBody MailAndCampaign mailAndCampaign, @PathVariable int id) {
//        boolean flag = campaignService.editCampaign(mailAndCampaign.mailObjectDTO,mailAndCampaign.campaignDTO,id);
//        if (flag == false) {
//            return ResponseEntity.status(CONFLICT).body("Campaign can not edit");
//        }
//        return ResponseEntity.status(ACCEPTED).body("Successfully");
//    }
//
//    @PutMapping(value = "campaign/add", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity addContent(@RequestBody Campaign campaign) {
//        Campaign accountEdited = campaignService.addContentToCampaign(campaign);
//        if (accountEdited != null) {
//            return ResponseEntity.status(ACCEPTED).body(accountEdited);
//        }
//        return ResponseEntity.status(NOT_ACCEPTABLE).body("Updated Fail");
//    }
//
//
//
//    @GetMapping("/campaigns")
//    Iterable<Campaign> getAll() {
//        return campaignRepository.findAll();
//    }
//
//    @ApiOperation(value = "Send Campaign Without Template")
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "Successful"),
//            @ApiResponse(code = 400, message = "Invalid  ID"),
//            @ApiResponse(code = 500, message = "Internal server error") })
//    @PostMapping(value="campaign/send", produces = MediaType.APPLICATION_JSON_VALUE)
//    public void sendCampaign(@RequestParam(value = "id")int id) {
//        campaignService.sendCampaign(id);
//    }
//
//



    }

