package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class AppointmentDTO implements Serializable {
    private String name;
    private String status;
    private String createdTime;
    private String token;
    private List<GCAppointmentDTO> gcAppointmentDTOS;

    private String updated_time;
    private String time;




}
