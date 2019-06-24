package com.emailmkt.emailmarketing.service;

import org.springframework.mail.SimpleMailMessage;

public interface MailService {
    void sendSimpleMessage(String from, String fromMail,String[] to, String subject, String body);
    void sendSimpleMessageUsingTemplate(String to,
                                        String subject,
                                        SimpleMailMessage template,
                                        String ...templateArgs);
    void sendMessageWithAttachment(String to,
                                   String subject,
                                   String text,
                                   String pathToAttachment);
    void prepareAndSend(String recipient, String message);
    void sendMail(String smtpServerHost, String smtpServerPort,  String smtpUserName, String smtpUserPassword, String fromUserEmail, String fromUserFullName, String toEmail, String subject, String body);



}
