package com.emailmkt.emailmarketing.service;

public interface MailService {
//    void sendSimpleMessage(String from, String fromMail,String[] to, String subject, String body);
    void sendSimpleMessageV2(String from, String fromMail,String to, String subject, String body);
    void sendAppointment(String from, String fromMail,String to, String subject, String body);
    void sendMessageWithAttachment(String to,
                                   String subject,
                                   String text,
                                   String pathToAttachment);



}
