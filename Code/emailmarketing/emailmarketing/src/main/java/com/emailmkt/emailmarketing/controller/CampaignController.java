package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.repository.CampaignRepository;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

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


    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }


    @PostMapping("campaign/create")
    public ResponseEntity createCampaignWithoutTemplate(@RequestBody MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO) {
        boolean flag = campaignService.createCampaign(mailObjectDTO,campaignDTO);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Campaign với tên này đã tồn tại");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công và đang thực hiện campaign");

    }

    }
