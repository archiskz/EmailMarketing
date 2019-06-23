package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.repository.CampaignRepository;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;

public class CampaignServiceImpl implements CampaignService {
    @Autowired
    MailService mailService;
    @Autowired
    CampaignRepository campaignRepository;




    @Override
    public boolean createCampaign(MailObjectDTO mailObjectDTO, int groupId) {
        return false;
    }

    @Override
    public boolean createCampaignWithTemplate(MailObjectDTO mailObjectDTO, int groupId, Template template) {
        return false;
    }

    @Override
    public boolean createAutoResponseCampaign(MailObjectDTO mailObjectDTO, int groupId, Template template) {
        return false;
    }
}
