package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.AppointmentDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Appointment;
import org.springframework.http.ResponseEntity;

public interface AppointmentService {
//    boolean createCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO);
//    void sendCampaign(int campaignId);
//    boolean createCampaignWithTemplate(MailObjectDTO mailObjectDTO, int groupId, Template template);
//    boolean createAutoResponseCampaign(MailObjectDTO mailObjectDTO, int groupId, Template template);
//
//     boolean editCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO, int id);
//    Campaign addContentToCampaign(Campaign campaign);
//
//    CampaignFullDTO getCampaginById(int id);
        Appointment findByName(String token);
        Appointment findByToken(String token);

    boolean createAppointment(MailObjectDTO mailObjectDTO, AppointmentDTO appointmentDTO);

    void sendAppointment(int appointmentId);
    Appointment addContentToAppointment(Appointment appointment);
    boolean editAppointment(MailObjectDTO mailObjectDTO, AppointmentDTO appointmentDTO, int id);
    Appointment getAppointmentById(int id);
    public ResponseEntity<String> acceptAppointment(String token,String email);

    boolean copyAppointment(int appointmentId,int workflowId);

    boolean testMappingMessage(int id);
}
