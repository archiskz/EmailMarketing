package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class CampaignDTO implements Serializable {
    private String campaignName;
    private String status;
    private String createdTime;
    private String timeStart;

    private String type;

    private List<GCCampaignDTO> gcCampaignDTOS;



}
