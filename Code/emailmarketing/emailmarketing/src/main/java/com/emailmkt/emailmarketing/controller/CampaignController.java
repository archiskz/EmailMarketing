package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.ScheduleEmailResponse;
import com.emailmkt.emailmarketing.repository.CampaignRepository;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.SubcriberService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://45.77.172.104:3000"})
public class CampaignController {
    private final CampaignRepository campaignRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(CampaignController.class);
    @Autowired
    CampaignService campaignService;
    SubcriberService subcriberService;

    @Autowired
    SubcriberRepository subcriberRepository;

    @Autowired
    public CampaignController(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    static class MailAndCampaign {
        public MailObjectDTO mailObjectDTO;
        public CampaignDTO campaignDTO;
    }

    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }

    @ApiOperation(value = "Create Campaign Without Template")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value="campaign/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createCampaignWithoutTemplate(@RequestBody MailAndCampaign mailAndCampaign) {
        boolean flag = campaignService.createCampaign(mailAndCampaign.mailObjectDTO,mailAndCampaign.campaignDTO);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Campaign Existed");
        }
        Campaign temp = campaignRepository.findByName(mailAndCampaign.campaignDTO.getCampaignName());
        return ResponseEntity.status(CREATED).body(temp.getId() );

    }

    @PutMapping("campaign/edit")
    public ResponseEntity updateProfile(@RequestBody Campaign campaign) {
        Campaign accountEdited = campaignService.editCampaign(campaign);
        if (accountEdited != null) {
            return ResponseEntity.status(OK).body(accountEdited);
        }
        return ResponseEntity.status(NOT_FOUND).body("Campaign is not exist");
    }
    @PostMapping("/scheduleEmail")
    public ResponseEntity<ScheduleEmailResponse> scheduleEmail(@Valid @RequestBody Campaign campaign) {
        return null;
    }


    @GetMapping("/campaigns")
    Iterable<Campaign> getAll() {
        return campaignRepository.findAll();
    }

    @ApiOperation(value = "Send Campaign Without Template")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value="campaign/send", produces = MediaType.APPLICATION_JSON_VALUE)
    public void sendCampaign(@RequestParam(value = "id")int id) {
        campaignService.sendCampaign(id);
    }





    }

