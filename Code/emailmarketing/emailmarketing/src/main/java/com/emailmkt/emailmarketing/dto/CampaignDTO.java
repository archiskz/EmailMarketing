package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class CampaignDTO implements Serializable {
    private String campaignName;
    private String status;
    private String createdTime;



}
