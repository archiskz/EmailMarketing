package com.emailmkt.emailmarketing.dto;

import lombok.Data;

import java.util.List;

@Data
public class CampaignFullDTO {
    private String campaignName;
    private String status;
    private String createdTime;
    private String type;
    private int id;

    // Mail Object
    private String subject;
    private String body;
    private String bodyJson;
    private String from;
    private String fromMail;

    private String updatedTime;

    //Statistic of Campaign
    private String request;
    private String delivery;
    private String click;
    private String open;

    private String spam;
    private String bounce;


//    private String[] groupContactName;
private List<GCCampaignDTO> gcCampaignDTOS;


}
