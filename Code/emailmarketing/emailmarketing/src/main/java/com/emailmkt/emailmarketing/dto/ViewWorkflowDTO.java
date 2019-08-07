package com.emailmkt.emailmarketing.dto;

import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.model.Campaign;
import lombok.Data;

import java.util.List;

@Data
public class ViewWorkflowDTO {
   private Campaign campaign;
   private Appointment appointment;
   private List<String> subcriersComing;
   private List<String> subcriberInTask;



}
