package com.emailmkt.emailmarketing.service;

public interface MailService {
    void sendSimpleMessage(String from, String fromMail,String[] to, String subject, String body);
    void sendSimpleMessageUsingTemplate(String from, String fromMail,String []to, String subject, String message);
    void sendMessageWithAttachment(String to,
                                   String subject,
                                   String text,
                                   String pathToAttachment);
    void prepareAndSend(String recipient, String message);
    void sendMail(String smtpServerHost, String smtpServerPort,  String smtpUserName, String smtpUserPassword, String fromUserEmail, String fromUserFullName, String toEmail, String subject, String body);



}
