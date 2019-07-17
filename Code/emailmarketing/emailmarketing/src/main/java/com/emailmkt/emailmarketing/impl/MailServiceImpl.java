package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.service.MailService;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

import static com.emailmkt.emailmarketing.constants.Constant.MESSAGE_ID;

@Service
public class MailServiceImpl implements MailService {




    @Autowired
    public JavaMailSender emailSender;


    @Autowired
    private SpringTemplateEngine templateEngine;

    static final String CONFIGSET = "Engagement";
    static final String HOST = "email-smtp.us-west-2.amazonaws.com";
    static final int PORT = 587;

    // Replace smtp_username with your Amazon SES SMTP user name.
    static final String SMTP_USERNAME = "AKIAXTZGLCQ6ONUQV5HD";

    // Replace smtp_password with your Amazon SES SMTP password.
    static final String SMTP_PASSWORD = "BAm6pI2gKgOK2NtlxpZWaZ6pSXsTpQg1ZgPw6FXWmTq7";




//    @Override
//    public void sendSimpleMessage(String from, String fromMail,String[]to, String subject, String body) {
//        try {
//
//
//            MimeMessage message = emailSender.createMimeMessage();
//
//            Session session = Session.getInstance(properties, null);
//            Transport transport = session.getTransport();
//            transport.connect();
//            MimeMessageHelper helper = new MimeMessageHelper(message,
//                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
//                    StandardCharsets.UTF_8.name());
//            message.setFrom(new InternetAddress(fromMail, from));
//
//            helper.setTo(to);
//            helper.setSubject(subject);
//            message.setContent(body,"text/html");
//            message.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);
//
//            emailSender.send(message);
//
//        } catch (Exception e) {
//
//            e.printStackTrace();
//        }
//
//    }Map

    @Override
    public void sendSimpleMessageV2(String from, String fromMail, String[] to, String subject, String body) {
        try {

            Properties properties = System.getProperties();
            properties.put("mail.transport.protocol", "smtp");
            properties.put("mail.smtp.port", PORT);
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.debug", "true");
            Session session = Session.getInstance(properties, null);
            MimeMessage message = new MimeMessage(session);
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            message.setFrom(new InternetAddress(fromMail, from));

            helper.setTo(to);
            helper.setSubject(subject);
            message.setContent(body,"text/html");
            message.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);

            Transport transport = session.getTransport();
            transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
            transport.sendMessage(message, message.getAllRecipients());
            if (transport instanceof SMTPTransport){

                String response = ((SMTPTransport) transport).getLastServerResponse();
                    System.out.println(response.split(" ")[2]);
                    MESSAGE_ID = response.split(" ")[2];

            }

        }catch (Exception e) {

            e.printStackTrace();
        }
    }


    @Override
    public void sendAppointment(String from, String fromMail, String to, String subject, String body) {
        try {

            Properties properties = System.getProperties();
            properties.put("mail.transport.protocol", "smtp");
            properties.put("mail.smtp.port", PORT);
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.debug", "true");
            Session session = Session.getInstance(properties, null);
            MimeMessage message = new MimeMessage(session);
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            message.setFrom(new InternetAddress(fromMail, from));

            helper.setTo(to);
            helper.setSubject(subject);
            message.setContent(body, "text/html");

            message.setHeader("X-SES-CONFIGURATION-SET", CONFIGSET);

            Transport transport = session.getTransport();
            transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
            transport.sendMessage(message, message.getAllRecipients());
            if (transport instanceof SMTPTransport){

                String response = ((SMTPTransport) transport).getLastServerResponse();
                System.out.println(response.split(" ")[2]);
                MESSAGE_ID = response.split(" ")[2];

            }

        }catch (Exception e) {

            e.printStackTrace();
        }
    }

    @Override
    public void sendSimpleMessageUsingTemplate(String from, String fromMail,String []to, String subject, String message) {

        sendSimpleMessageV2(from,fromMail,to,subject,message);
    }

    @Override
    public void sendMessageWithAttachment(String to, String subject, String text, String pathToAttachment) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            // pass 'true' to the constructor to create a multipart message
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            FileSystemResource file = new FileSystemResource(new File(pathToAttachment));
            helper.addAttachment("Invoice", file);
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }




}
