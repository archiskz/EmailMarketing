package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubcriberDTO {
    private int id;


    private String firstName;

    private String lastName;

    private String dob;

    private String address;

    private String phone;

    private String email;

    private String type;

    private String tag;

    private List<GCSubcriberDTO> gcSubcriberDTOS;
}
