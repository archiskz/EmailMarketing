package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.model.AppointmentGroupContact;
import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    AppointmentGroupContactRepository appointmentGroupContactRepository;

    @Autowired
    GroupContactRepository groupContactRepository;

    @Autowired
    SubcriberRepository subcriberRepository;
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
//        appointment.setTo("tannm@unicode.edu.vn");
//        String[] strArray = new String[] {appointment.getTo()};
        List<String> mailLists = new ArrayList<>();
        List<AppointmentGroupContact> appointmentGroupContacts = appointmentDTO.getGcAppointmentDTOS().stream().map(g->{

            AppointmentGroupContact appointmentGroupContact = new AppointmentGroupContact();
            appointmentGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            appointmentGroupContact.setAppointment(appointment);
            appointmentGroupContact.setCreatedTime(LocalDateTime.now().toString());
//            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(appointmentGroupContact.getGroupContact().getId());
//            for (int i = 0; i < mailList.length; i++) {
//                mailLists.add(mailList[i]);
//            }
            List<AppointmentSubcriber> appointmentSubcribers = g.getSubAppointmentDTOS().stream().map(r->{
                AppointmentSubcriber appointmentSubcriber = new AppointmentSubcriber();
                appointmentSubcriber.setConfirmation(false);
                appointmentSubcriber.setCreatedTime(LocalDateTime.now().toString());
                appointmentSubcriber.setAppointmentGroupContact(appointmentGroupContact);
                appointmentSubcriber.setSubcriberEmail("null");
                return appointmentSubcriber;
            }).collect(Collectors.toList());
            appointmentGroupContact.setAppointmentSubcribers(appointmentSubcribers);

            return appointmentGroupContact;
        }).collect(Collectors.toList());

        appointment.setAppointmentGroupContacts(appointmentGroupContacts);

        appointment.setToken(UUID.randomUUID().toString());
        appointmentDTO.setToken(appointment.getToken());
        appointment.setConfirm(false);
         appointmentRepository.save(appointment);


        return true;
    }

    @Override
    public void sendAppointment(int appointmentId) {

    }

    @Override
    public Appointment addContentToAppointment(Appointment appointment) {
        Appointment appointmentEdit= appointmentRepository.findAppointmentById(appointment.getId());
        if (appointmentEdit == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This appointment is not exist!");
        }

        appointmentEdit.setBodyJson(appointment.getBodyJson());
        appointmentEdit.setBody(appointment.getBody());

        appointmentEdit.setUpdatedTime(LocalDateTime.now().toString());
        return appointmentRepository.save(appointmentEdit);
    }

    @Override
    public boolean editAppointment(MailObjectDTO mailObjectDTO, AppointmentDTO appointmentDTO, int id) {
        return false;
    }

    @Override
    public AppointmentDTO getAppointmentById(int id) {
        return null;
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
