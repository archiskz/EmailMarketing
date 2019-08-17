package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.EmailVerified;

import java.util.List;

public interface EmailVerifiedService {
   List<EmailVerified> getEmailVerifed(int accountId);

   boolean verifyEmail(EmailVerified emailVerified, int accountId);



}
