package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.*;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.AppointmentService;
import com.emailmkt.emailmarketing.service.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    public static final int NUM_OF_THREAD = 10;

    private final Configuration templates;

    @Autowired
    MyMessageRepository myMessageRepository;

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AppointmentSubcriberRepository appointmentSubcriberRepository;

    @Autowired
    GroupContactRepository groupContactRepository;

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    SubcriberRepository subcriberRepository;
    @Autowired
    MailService mailService;

    public AppointmentServiceImpl(Configuration templates) {
        this.templates = templates;
    }


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
        appointment.setAutomation(false);



        //Add to Group Contacts
        Account account = accountRepository.findAccountById(3);
        appointment.setAccount_id(account.getId());
//        appointment.setTo("tannm@unicode.edu.vn");
//        String[] strArray = new String[] {appointment.getTo()};
        List<String> mailLists = new ArrayList<>();
        List<AppointmentGroupContact> appointmentGroupContacts = appointmentDTO.getGcAppointmentDTOS().stream().map(g -> {
            AppointmentGroupContact appointmentGroupContact = new AppointmentGroupContact();
            appointmentGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            appointmentGroupContact.setAppointment(appointment);
            appointmentGroupContact.setCreatedTime(LocalDateTime.now().toString());
            System.out.println("Tới đây 1");
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(appointmentGroupContact.getGroupContact().getId());
            //Add Subcriber To Appointments
            List<AppointmentSubcriber> appointmentSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                AppointmentSubcriber appointmentSubcriber = new AppointmentSubcriber();
                appointmentSubcriber.setConfirmation(0);
                appointmentSubcriber.setCreatedTime(LocalDateTime.now().toString());
                appointmentSubcriber.setAppointmentGroupContact(appointmentGroupContact);
                appointmentSubcriber.setSend(0);
                appointmentSubcriber.setConfirmation(0);
                appointmentSubcriber.setOpened(false);

                appointmentSubcriber.setSubcriberEmail(mailList[i]);
                appointmentSubcribers.add(appointmentSubcriber);
            }


            appointmentGroupContact.setAppointmentSubcribers(appointmentSubcribers);

            return appointmentGroupContact;
        }).collect(Collectors.toList());

        appointment.setAppointmentGroupContacts(appointmentGroupContacts);
//
        appointment.setToken(UUID.randomUUID().toString());
        appointmentDTO.setToken(appointment.getToken());
        appointmentRepository.save(appointment);

        try {

//            String bodyTemp = appointment.getBody();
//            int index = bodyTemp.indexOf("<a href=\"\"") + 8;
//            System.out.println(index);

            for (int counter = 0; counter < mailLists.size(); counter++) {
                String bodyTemp = appointment.getBody();
                int index = bodyTemp.indexOf("<a href=\"\"") + 8;
                String newString = new String();
                for (int i = 0; i < bodyTemp.length(); i++) {

                    newString += bodyTemp.charAt(i);
                    if (i == index) {
                        newString += "http://localhost:8080/api/accept-appointment?confirmationToken=" + appointment.getToken() + "&subcriberEmail=" + mailLists.get(counter);
                    }
                }

                mailService.sendAppointment(appointment.getSender(),
                        appointment.getFromMail(),
                        mailLists.get(counter), appointment.getSubject(),
                        newString);
                AppointmentSubcriber appointmentSubcriber = appointmentSubcriberRepository.changeConfirmSend(appointment.getId(), mailLists.get(counter));
                appointmentSubcriber.setSend(1);
                appointmentSubcriberRepository.save(appointmentSubcriber);

            }


        } catch (MailException e) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
        }


        return true;
    }

    @Override
    public void sendAppointment(int appointmentId) {

    }

    @Override
    public Appointment addContentToAppointment(Appointment appointment) {
        Appointment appointmentEdit = appointmentRepository.findAppointmentById(appointment.getId());
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
    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findAppointmentById(id);
    }

    @Override
    public ResponseEntity<String> acceptAppointment(String token, String email) {
        Appointment appointment = appointmentRepository.findByToken(token);
        AppointmentSubcriber appointmentSubcriber = appointmentRepository.findMailByAppointmentId(appointment.getId(), email);
        List<AppointmentGroupContact> appointmentGroupContacts = new ArrayList<>();

        if (appointmentSubcriber == null) {
            return ResponseEntity.badRequest().body("Invalid token.");
        } else {
            appointmentSubcriber.setConfirmation(1);
            appointmentRepository.save(appointment);
            String body = "";
            try {

                Template t = templates.getTemplate("test.ftl");
                Map<String, String> map = new HashMap<>();
                map.put("DATE", appointment.getTime());
                map.put("APPOINTMENT_NAME", appointment.getName());
                body = FreeMarkerTemplateUtils.processTemplateIntoString(t, map);

            } catch (Exception ex) {
                Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, ex.getMessage(), ex);
            }
            mailService.sendAppointment(appointment.getFromMail(), appointment.getFromMail(), appointmentSubcriber.getSubcriberEmail(), "Confirm Invite Email", body);
        }

        return ResponseEntity.ok("Thanks for accepting my invite!");
    }

    @Override
    public boolean copyAppointment(int appointmentId, int workflowId) {

        Appointment temp = appointmentRepository.findAppointmentById(appointmentId);
        Workflow workflow = workflowRepository.findWorkflowById(workflowId);
        if(temp==null || workflow==null){
            return false;
        }
        Appointment appointment= new Appointment();
            appointment.setAccount_id(1);
            List<AppointmentGroupContact> appointmentGroupContacts = workflow.getWorkflowGroupContacts().stream().map(g->{
                AppointmentGroupContact appointmentGroupContact = new AppointmentGroupContact();
                appointmentGroupContact.setGroupContact(g.getGroupContact());
                appointmentGroupContact.setAppointment(appointment);
                appointmentGroupContact.setCreatedTime(LocalDateTime.now().toString());
                String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(appointmentGroupContact.getGroupContact().getId());
                //Add Subcriber To Appointments
                List<AppointmentSubcriber> appointmentSubcribers = new ArrayList<>();
                for (int i = 0; i < mailList.length; i++) {
                    AppointmentSubcriber appointmentSubcriber = new AppointmentSubcriber();
                    appointmentSubcriber.setConfirmation(0);
                    appointmentSubcriber.setCreatedTime(LocalDateTime.now().toString());
                    appointmentSubcriber.setAppointmentGroupContact(appointmentGroupContact);
                    appointmentSubcriber.setSend(0);
                    appointmentSubcriber.setConfirmation(0);
                    appointmentSubcriber.setOpened(false);

                    appointmentSubcriber.setSubcriberEmail(mailList[i]);
                    appointmentSubcribers.add(appointmentSubcriber);
                }
                appointmentGroupContact.setAppointmentSubcribers(appointmentSubcribers);

                return appointmentGroupContact;
            }).collect(Collectors.toList());
             appointment.setAppointmentGroupContacts(appointmentGroupContacts);
            appointment.setBody(temp.getBody());
            appointment.setToken(UUID.randomUUID().toString());
            appointment.setTime(temp.getTime());
            appointment.setBodyJson(temp.getBodyJson());
            appointment.setCreatedTime(LocalDateTime.now().toString());
            appointment.setName(temp.getName()+UUID.randomUUID().toString());
            appointment.setSubject(temp.getSubject());
            appointment.setStatus("Sending");
            appointment.setAutomation(true);
            appointment.setMessageId(temp.getMessageId());
            appointment.setFromMail(temp.getFromMail());
            appointment.setSender(temp.getSender());
            appointmentRepository.save(appointment);
            return true;
    }

    @Override
    public boolean testMappingMessage(int id) {
        ObjectMapper mapper = new ObjectMapper();
        try {


            String jsonInString = myMessageRepository.findContentByMessageId(id);
            JSONObject jsonObject = new JSONObject(jsonInString);
            JSONObject mail = jsonObject.getJSONObject("mail");
            System.out.println((String) mail.get("messageId") + "Tan123");


        } catch (JSONException e) {
            e.printStackTrace();
        }
        return true;
    }
}
