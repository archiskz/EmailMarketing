package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.EmailVerified;
import com.emailmkt.emailmarketing.service.EmailVerifiedService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")

@CrossOrigin(origins = "*", allowedHeaders = "*")

public class EmailVerifiedController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailVerifiedController.class);
//    private final AuthenticationManager authenticationManager;

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String awsRegion;


    @Autowired
    EmailVerifiedService emailVerifiedService;



    @GetMapping("/emailverified")
    public List<EmailVerified> getAllEmailVerified(@RequestParam int accountId) {
        return emailVerifiedService.getEmailVerifed(accountId);

    }

    @PostMapping("emailverified/verify")
    public ResponseEntity verifyEmail(@RequestBody EmailVerified emailVerified, @RequestParam int accountId) {
        boolean flag = emailVerifiedService.verifyEmail(emailVerified,accountId);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Verify fail");
        }
        return ResponseEntity.status(ACCEPTED).body("Sent mail to verify");

    }





    }
