package com.emailmkt.emailmarketing.dto;

import com.emailmkt.emailmarketing.model.Subcriber;
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

// List Of Contacts
    private List<Subcriber> contactRequest;
    private List<Subcriber> contactSpam;
    private List<Subcriber> contactOpened;
    private List<Subcriber> contactClicked;
    private List<Subcriber> contactBounce;
    private List<Subcriber> contactDelivery;


}
