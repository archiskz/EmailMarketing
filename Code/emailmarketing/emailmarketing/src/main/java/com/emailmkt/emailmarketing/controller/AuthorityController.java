package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.service.AuthorityService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthorityController {
    public static final String BASE_URL = "role";

    private final AuthorityService authorityService;

    public AuthorityController(AuthorityService authorityService) {
        this.authorityService = authorityService;
    }
}
