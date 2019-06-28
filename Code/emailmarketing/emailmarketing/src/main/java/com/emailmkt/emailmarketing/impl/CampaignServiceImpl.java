package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.CampaignGroupContact;
import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.CampaignRepository;
import com.emailmkt.emailmarketing.repository.GroupContactRepository;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
@Service
public class CampaignServiceImpl implements CampaignService {
    @Autowired
    MailService mailService;
    @Autowired
    CampaignRepository campaignRepository;

    @Autowired
    AccountRepository accountRepository;



    @Autowired
    GroupContactRepository groupContactRepository;




    @Override
    public boolean createCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO) {
//        String[]to = new String[Integer.MAX_VALUE];
//        String[] to = new String[]{"archis123456@mindsending.cf","tan456@mindsending.cf"};
        System.out.println(campaignDTO.getCampaignName());
        Campaign checkExistedCampain = campaignRepository.findByName(campaignDTO.getCampaignName());
        if (checkExistedCampain != null) {
            return false;
        }
        Campaign campaign = new Campaign();
        //Mail Object
        campaign.setContent(mailObjectDTO.getBody());
        campaign.setBodyJson(mailObjectDTO.getBodyJson());
        campaign.setFromMail(mailObjectDTO.getFromMail());
        campaign.setSender(mailObjectDTO.getFrom());
        campaign.setSubject(mailObjectDTO.getSubject());
        //Campaign Info
        campaign.setCreatedTime(LocalDateTime.now().toString());
        campaign.setName(campaignDTO.getCampaignName());
        campaign.setStatus(campaignDTO.getStatus());
        campaign.setType("Regular");

        //Add to Group Contacts
        Account account = accountRepository.findAccountById(1);
        campaign.setAccount_id(account.getId());
        List<String>mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            System.out.println(mailList);
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
            }
            campaignGroupContact.setCampaign(campaign);
            return campaignGroupContact;
        }).collect(Collectors.toList());
        campaign.setCampaignGroupContacts(campaignGroupContacts);

        campaignRepository.save(campaign);

//        mailService.sendSimpleMessage(campaign.getSender(),campaign.getFromMail(),mailLists.stream().toArray(String[]::new),campaign.getSubject(),campaign.getContent());

        return true;
    }

    @Override
    public void sendCampaign(int id) {
        Campaign campaign = campaignRepository.findById(id);
        String sender = campaign.getSender();
        String fromMail = campaign.getFromMail();
        String subject = campaign.getSubject();
        String content = campaign.getContent();
        List<String>mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaign.getCampaignGroupContacts().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContact().getId()));
            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
            }
            return campaignGroupContact;
        }).collect(Collectors.toList());
        try{
            mailService.sendSimpleMessage(sender,fromMail,mailLists.stream().toArray(String[]::new),subject,content);
        }catch (MailException e){
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
        }

    }

    @Override
    public boolean createCampaignWithTemplate(MailObjectDTO mailObjectDTO, int groupId, Template template) {
        return false;
    }

    @Override
    public boolean createAutoResponseCampaign(MailObjectDTO mailObjectDTO, int groupId, Template template) {
        return false;
    }

    @Override
    public Campaign editCampaign(Campaign campaign) {
        Campaign campaignEdit= campaignRepository.findById(campaign.getId());
        if (campaignEdit == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This campaign is not exist!");
        }
        campaignEdit.setName(campaign.getName());
        campaignEdit.setBodyJson(campaign.getBodyJson());
        campaignEdit.setContent(campaign.getContent());
        campaignEdit.setCampaignGroupContacts(campaign.getCampaignGroupContacts());
        campaignEdit.setSender(campaign.getSender());
        campaignEdit.setFromMail(campaign.getFromMail());
        campaign.setSubject(campaign.getFromMail());
        campaign.setUpdatedTime(LocalDateTime.now().toString());
        return campaignRepository.save(campaignEdit);

    }
}
