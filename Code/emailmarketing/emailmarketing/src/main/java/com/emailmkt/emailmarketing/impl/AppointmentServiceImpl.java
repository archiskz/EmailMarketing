package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.AppointmentRepository;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    MailService mailService;


    @Override
    public Appointment findByName(String token) {
        return null;
    }

    @Override
    public Appointment findByToken(String token) {
        return null;
    }

    @Override
    public boolean createAppointment(MailObjectDTO mailObjectDTO, AppointmentDTO appointmentDTO) {
        System.out.println(appointmentDTO.getName());
        Appointment checkExistedAppointment = appointmentRepository.findByName(appointmentDTO.getName());
        if (checkExistedAppointment != null) {
            return false;
        }
        Appointment appointment = new Appointment();
        //Mail Object
        appointment.setBody(mailObjectDTO.getBody());
        appointment.setBodyJson(mailObjectDTO.getBodyJson());
        appointment.setFromMail(mailObjectDTO.getFromMail());
        appointment.setSender(mailObjectDTO.getFrom());
        appointment.setSubject(mailObjectDTO.getSubject());
        //Appointment Info
        appointment.setCreatedTime(LocalDateTime.now().toString());
        appointment.setName(appointmentDTO.getName());
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setTime(appointmentDTO.getTime());

        //Add to Group Contacts
        Account account = accountRepository.findAccountById(3);
        appointment.setAccount_id(account.getId());
        appointment.setTo("tannm@unicode.edu.vn");
        String[] strArray = new String[] {appointment.getTo()};
        appointment.setToken(UUID.randomUUID().toString());
        appointmentDTO.setToken(appointment.getToken());
        appointment.setConfirm(false);

            appointmentRepository.save(appointment);


        return true;
    }

    @Override
    public ResponseEntity<String> acceptAppointment(String token) {
        Appointment appointment = appointmentRepository.findByToken(token);
        if(appointment == null){
            return ResponseEntity.badRequest().body("Invalid token.");
        }
        else{
            appointment.setConfirm(true);
            appointmentRepository.save(appointment);
        }
        return ResponseEntity.ok("You have successfully verified your email address.");
    }
}
