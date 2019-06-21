package com.emailmkt.emailmarketing;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;
@Configuration
public class Config {
    @Bean
    public JavaMailSender mailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("email-smtp.us-west-2.amazonaws.com");
        mailSender.setUsername("AKIAXTZGLCQ6F7AXMGGL");
        mailSender.setPassword("BKy8tp5GllHPu1QnH+Vprgn2S72lMzw/P38rK4heBuZ5");
        mailSender.setPort(587);


        // This can be very helpful
        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.port", 25);
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
//        properties.put("mail.user", "AKIAXTZGLCQ6NMEKQWG");
//        properties.put("mail.password", "BOoamo3f0RImsec8BLOmeUL4Uvr4H3e2uGS6OH4RVGBY");
        properties.put("mail.debug", "true");
        mailSender.setJavaMailProperties(properties);

        return mailSender;
    }

}
