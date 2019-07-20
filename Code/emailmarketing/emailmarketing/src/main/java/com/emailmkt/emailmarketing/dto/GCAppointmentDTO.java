package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.util.List;

@Data
public class GCAppointmentDTO {

    private int groupContactId;
    private List<SubAppointmentDTO> subAppointmentDTOS;
}
