package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.*;
import com.emailmkt.emailmarketing.model.*;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import static com.emailmkt.emailmarketing.constants.Constant.MESSAGE_ID;

@Service
public class CampaignServiceImpl implements CampaignService {
    @Autowired
    MailService mailService;
    @Autowired
    CampaignRepository campaignRepository;
    @Autowired
    SubcriberRepository subcriberRepository;
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CampaignGroupContactRepository campaignGroupContactRepository;

    @Autowired
    WorkflowRepository workflowRepository;

    @Autowired
    CampaignSubcriberRepository campaignSubcriberRepository;



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
        campaign.setStatus("Draft");
        campaign.setType("Regular");
        campaign.setAutomation(false);
        campaign.setTimeStart(LocalDateTime.now().toString());
        //Add to Group Contacts
        Account account = accountRepository.findAccountById(1);
        campaign.setAccount_id(account.getId());
        List<String>mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setConfirmation(false);
                campaignSubcriber.setCreatedTime(LocalDateTime.now().toString());
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);
                campaignSubcriber.setOpened(false);
                campaignSubcriber.setSend(false);
            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
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
        campaign.setStatus("Sending");
        String sender = campaign.getSender();
        String fromMail = campaign.getFromMail();
        String subject = campaign.getSubject();
        String content = campaign.getContent();
        List<String>mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaign.getCampaignGroupContacts().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContact().getId()));
            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers= new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setConfirmation(false);
                campaignSubcriber.setCreatedTime(LocalDateTime.now().toString());
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSend(true);
                campaignSubcriber.setOpened(false);

                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);

            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
            return campaignGroupContact;

        }).collect(Collectors.toList());
        try{
            for (int counter = 0; counter < mailLists.size(); counter++) {
                content = campaign.getContent();
                try{
                    content= content.replace("email_subcriber",mailLists.get(counter));
                } catch (Exception e){
                    e.printStackTrace();
                }
                try{
                    Subcriber personalization = subcriberRepository.findSubcriberByEmail(mailLists.get(counter));
                    content= content.replace("last_name_subcriber",personalization.getLastName());
                } catch (Exception e){
                    e.printStackTrace();
                }
                try{
                    Subcriber personalization = subcriberRepository.findSubcriberByEmail(mailLists.get(counter));
                    content = content.replace("first_name_subcriber",personalization.getFirstName());
                } catch (Exception e){
                    e.printStackTrace();
                }
                mailService.sendSimpleMessageV2(sender,fromMail,mailLists.get(counter),subject,content);
                content="";
                CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(id, mailLists.get(counter));
                campaignSubcriber.setSend(true);
                campaignSubcriber.setMessageId(MESSAGE_ID.trim());
                campaign.setStatus("Done");
                campaignRepository.save(campaign);
            }

        }catch (MailException e){
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
        }

    }

    @Override
    public boolean createCampaignWithTimer(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO) {
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
        campaign.setStatus("Sending");
        campaign.setType("Timer");
        campaign.setAutomation(false);
        campaign.setTimeStart(campaignDTO.getTimeStart());

        //Add to Group Contacts
        Account account = accountRepository.findAccountById(1);
        campaign.setAccount_id(account.getId());
        List<String>mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[]mailList= groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setConfirmation(false);
                campaignSubcriber.setCreatedTime(LocalDateTime.now().toString());
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);
            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
            campaignGroupContact.setCampaign(campaign);
            return campaignGroupContact;
        }).collect(Collectors.toList());

        campaign.setCampaignGroupContacts(campaignGroupContacts);
<<<<<<< HEAD
=======

        campaignRepository.save(campaign);
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                for (int counter = 0; counter < mailLists.size(); counter++) {
                    mailService.sendSimpleMessageV2(campaign.getSender(),campaign.getFromMail(),mailLists.get(counter),campaign.getSubject(),campaign.getContent());
                    CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(campaign.getId(), mailLists.get(counter));
                    campaignSubcriber.setSend(true);
                    campaignSubcriber.setMessageId(MESSAGE_ID.trim());
                    campaign.setStatus("Done");
                    campaignSubcriberRepository.save(campaignSubcriber);
                    campaignRepository.save(campaign);

                }


            }
        };
>>>>>>> 258b95143b8c825047f84aebe0b45319a12c8da2
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy hh:mm a");
        Date dt = null;
        try {
            //parse Datatime to Calendar
            dt = df.parse(campaign.getTimeStart());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(dt);
        Timer timer = new Timer();
        Date dateSchedule = calendar.getTime();


        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                for (int counter = 0; counter < mailLists.size(); counter++) {
                    mailService.sendSimpleMessageV2(campaign.getSender(),campaign.getFromMail(),mailLists.get(counter),campaign.getSubject(),campaign.getContent());
                    CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(campaign.getId(), mailLists.get(counter));
                    campaignSubcriber.setSend(true);
                    campaignSubcriber.setMessageId(MESSAGE_ID.trim());
                    campaign.setStatus("Done");
                    campaignSubcriberRepository.save(campaignSubcriber);

                }
                campaignRepository.save(campaign);
            }

        };
        campaignRepository.save(campaign);
        timer.schedule(task, dateSchedule);

        return true;
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
        // Get Statistic of Campaign
        double request = campaignSubcriberRepository.countRequest(id);
        double bounce = campaignSubcriberRepository.countBounce(id);
        double delivery = campaignSubcriberRepository.countDelivery(id);
        double open = campaignSubcriberRepository.countOpen(id);
        double click = campaignSubcriberRepository.countClick(id);
        double spam = campaignSubcriberRepository.countSpam(id);

        campaign.setBounce(Math.round((bounce/request)*100)+"%");
        campaign.setDelivery(Math.round((delivery/request)*100)+"%");
        campaign.setClickRate(Math.round((click/request)*100) +"%");
        campaign.setSpamRate(Math.round((spam/request)*100) +"%");


        campaignRepository.save(campaign);



        CampaignFullDTO campaignFullDTO = new CampaignFullDTO();

        campaignFullDTO.setId(id);
        campaignFullDTO.setCampaignName(campaign.getName());
        campaignFullDTO.setStatus(campaign.getStatus());
        campaignFullDTO.setBody(campaign.getContent());
        campaignFullDTO.setFrom(campaign.getSender());
        campaignFullDTO.setSubject(campaign.getSubject());
        campaignFullDTO.setFrom(campaign.getSender());
        campaignFullDTO.setCreatedTime(campaign.getCreatedTime());
        campaignFullDTO.setUpdatedTime(LocalDateTime.now().toString());
        campaignFullDTO.setFromMail(campaign.getFromMail());
        campaignFullDTO.setBodyJson(campaign.getBodyJson());

        List<GCCampaignDTO> gcCampaignDTOs = campaign.getCampaignGroupContacts().stream().map(g->{
            GCCampaignDTO gcCampaignDTO= new GCCampaignDTO();
            gcCampaignDTO.setGroupContactId(g.getGroupContact().getId());

            return gcCampaignDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setGcCampaignDTOS(gcCampaignDTOs);
        //Statistic
        campaignFullDTO.setRequest(String.valueOf(request));
        campaignFullDTO.setOpen(Math.round((open/request)*100) +"%");
        campaignFullDTO.setBounce(Math.round((bounce/request)*100)+"%");
        campaignFullDTO.setDelivery(Math.round((delivery/request)*100)+"%");
        campaignFullDTO.setClick(Math.round((click/request)*100) +"%");
        campaignFullDTO.setSpam(Math.round((spam/request)*100) +"%");

        return campaignFullDTO;
    }

    @Override
    public int copyCampaign(int campaignId, int workflowId) {

        Campaign temp = campaignRepository.findCampaignById(campaignId);
        Workflow workflow = workflowRepository.findWorkflowById(workflowId);
        if(temp==null||workflow== null){
            return 1;
        }

        Campaign campaign= new Campaign();
        List<CampaignGroupContact> campaignGroupContacts = workflow.getWorkflowGroupContacts().stream().map(g->{
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(g.getGroupContact());
            campaignGroupContact.setCampaign(campaign);
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            //Add Subcriber To Appointments
            List<CampaignSubcriber> campaignSubcribers= new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                CampaignSubcriber campaignSubcriber= new CampaignSubcriber();
                campaignSubcriber.setConfirmation(false);
                campaignSubcriber.setCreatedTime(LocalDateTime.now().toString());
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setOpened(false);
                campaignSubcriber.setSend(false);
                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);
            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);

            return campaignGroupContact;
        }).collect(Collectors.toList());
        campaign.setAccount_id(1);
        campaign.setCampaignGroupContacts(campaignGroupContacts);
        campaign.setAutomation(true);
        campaign.setTimeStart(temp.getTimeStart());
        campaign.setStatus("Sending");
        campaign.setBodyJson(temp.getBodyJson());
        campaign.setFromMail(temp.getFromMail());
        campaign.setSubject(temp.getSubject());
        campaign.setSender(temp.getSender());
        campaign.setContent(temp.getContent());
        campaign.setType(temp.getType());
        campaign.setName(temp.getName()+UUID.randomUUID().toString());
        campaignRepository.save(campaign);
        return campaign.getId();
    }




}
