package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Authority;
import com.emailmkt.emailmarketing.repository.AuthorityRepository;
import com.emailmkt.emailmarketing.service.AuthorityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityServiceImpl implements AuthorityService {
    private final AuthorityRepository authorityRepository;

    public AuthorityServiceImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }


    @Override
    public List<Authority> getAllRoles() {
        return authorityRepository.findAll();
    }
}
