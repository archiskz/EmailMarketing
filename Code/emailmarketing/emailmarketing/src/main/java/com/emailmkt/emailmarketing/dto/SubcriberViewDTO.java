package com.emailmkt.emailmarketing.dto;

import lombok.Data;

@Data
public class SubcriberViewDTO {

    private int id;
    private String firstName;

    private String lastName;

    private String dob;

    private String address;

    private String phone;

    private String email;

    private String type;

    String openRate;
    String clickRate;

    int belongGroup;
    int belongCampaign;

    String createdTime;

}
