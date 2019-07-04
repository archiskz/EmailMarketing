package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.Template;

public interface CampaignService {
    boolean createCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO);
    void sendCampaign(int campaignId);
    boolean createCampaignWithTemplate(MailObjectDTO mailObjectDTO, int groupId, Template template);
    boolean createAutoResponseCampaign(MailObjectDTO mailObjectDTO, int groupId, Template template);

     boolean editCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO,int id);
    Campaign addContentToCampaign(Campaign campaign);

    Campaign getCampaginById(int id);



}
