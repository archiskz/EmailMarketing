package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.CampaignDTO;
import com.emailmkt.emailmarketing.dto.CampaignFullDTO;
import com.emailmkt.emailmarketing.dto.GCCampaignDTO;
import com.emailmkt.emailmarketing.dto.MailObjectDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.CampaignGroupContact;
import com.emailmkt.emailmarketing.model.Template;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.CampaignGroupContactRepository;
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
    CampaignGroupContactRepository campaignGroupContactRepository;



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
        Campaign campaign = campaignRepository.findCampaignById(id);
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
    public boolean editCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO,int id) {
        Campaign campaignEdit= campaignRepository.findCampaignById(id);
        if (campaignEdit.getStatus() == "Done") {
            return false;
        }
        campaignGroupContactRepository.deleteCampaignFromCampaginGroup(id);
        Account account = accountRepository.findAccountById(1);
        campaignEdit.setAccount_id(account.getId());
        campaignEdit.setName(campaignDTO.getCampaignName());
        campaignEdit.setBodyJson(mailObjectDTO.getBodyJson());
        campaignEdit.setContent(mailObjectDTO.getBody());
        campaignEdit.setSender(mailObjectDTO.getFrom());
        campaignEdit.setFromMail(mailObjectDTO.getFromMail());
        campaignEdit.setSubject(mailObjectDTO.getSubject());
        campaignEdit.setUpdatedTime(LocalDateTime.now().toString());
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            campaignGroupContact.setCampaign(campaignEdit);

            return campaignGroupContact;
        }).collect(Collectors.toList());

        campaignEdit.setCampaignGroupContacts(campaignGroupContacts);

        campaignRepository.save(campaignEdit);
        return true;
    }

    @Override
    public Campaign addContentToCampaign(Campaign campaign) {
        Campaign campaignEdit= campaignRepository.findCampaignById(campaign.getId());
        if (campaignEdit == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This campaign is not exist!");
        }

        campaignEdit.setBodyJson(campaign.getBodyJson());
        campaignEdit.setContent(campaign.getContent());

        campaignEdit.setUpdatedTime(LocalDateTime.now().toString());
        return campaignRepository.save(campaignEdit);

    }

    @Override
    public CampaignFullDTO getCampaginById(int id) {
        Campaign campaign = campaignRepository.findCampaignById(id);

        CampaignFullDTO campaignFullDTO = new CampaignFullDTO();

        campaignFullDTO.setId(id);
        campaignFullDTO.setStatus(campaign.getStatus());
        campaignFullDTO.setBody(campaign.getContent());
        campaignFullDTO.setFrom(campaign.getSender());
        campaignFullDTO.setSubject(campaign.getSubject());
        campaignFullDTO.setFrom(campaign.getSender());
        campaignFullDTO.setCreatedTime(campaign.getCreatedTime());
        campaignFullDTO.setUpdatedTime(LocalDateTime.now().toString());
        campaignFullDTO.setFromMail(campaign.getFromMail());
        campaignFullDTO.setBodyJson(campaign.getBodyJson());
//        campaignFullDTO.setGroupContactName(campaignGroupContactRepository.findGroupByCampaignId(id));
//        campaign.getCampaignGroupContacts().stream().map();
        List<GCCampaignDTO> gcCampaignDTOs = campaign.getCampaignGroupContacts().stream().map(g->{
            GCCampaignDTO gcCampaignDTO= new GCCampaignDTO();
            gcCampaignDTO.setGroupContactId(g.getGroupContact().getId());

            return gcCampaignDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setGcCampaignDTOS(gcCampaignDTOs);
        return campaignFullDTO;
    }

}
