package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.*;
import com.emailmkt.emailmarketing.model.*;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.CampaignService;
import com.emailmkt.emailmarketing.service.MailService;
import org.slf4j.LoggerFactory;
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
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CampaignServiceImpl implements CampaignService {
    private static final org.slf4j.Logger log = LoggerFactory.getLogger(CampaignServiceImpl.class);
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
    public boolean createCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO, Account account) {
        System.out.println(campaignDTO.getCampaignName());
        Campaign checkExistedCampain = campaignRepository.findByNameAndAccount_id(campaignDTO.getCampaignName(), account.getId());
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
//        Account account = accountRepository.findAccountById(1);
        campaign.setAccount_id(account.getId());
        List<String> mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
                campaignSubcriber.setCreatedTime("");
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
        campaignRepository.save(campaign);
        String sender = campaign.getSender();
        String fromMail = campaign.getFromMail();
        String subject = campaign.getSubject();
        String content = campaign.getContent();
        List<String> mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaign.getCampaignGroupContacts().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContact().getId()));
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
                campaignSubcriber.setCreatedTime("");
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSend(true);
                campaignSubcriber.setOpened(false);

                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);

            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
            return campaignGroupContact;

        }).collect(Collectors.toList());
        try {
            for (int counter = 0; counter < mailLists.size(); counter++) {
                content = campaign.getContent();
                try {
                    content = content.replace("{{email}}", mailLists.get(counter));
                } catch (Exception e) {
                    e.printStackTrace();
                }
                try {
                    Subcriber personalization = subcriberRepository.findSubcriberByEmail(mailLists.get(counter));
                    content = content.replace("{{last_name}}", personalization.getLastName());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                try {
                    Subcriber personalization = subcriberRepository.findSubcriberByEmail(mailLists.get(counter));
                    content = content.replace("{{first_name}}", personalization.getFirstName());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                String messageId = mailService.sendSimpleMessageV2(sender, fromMail, mailLists.get(counter), subject, content);
                content = "";
                CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(id, mailLists.get(counter));
                campaignSubcriber.setSend(true);
                campaignSubcriber.setMessageId(messageId.trim());
                campaign.setStatus("Done");
                campaignRepository.save(campaign);
            }

        } catch (MailException e) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
        }

    }

    @Override
    public boolean createCampaignWithTimer(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO, Account account) {
        System.out.println(campaignDTO.getCampaignName());
        Campaign checkExistedCampain = campaignRepository.findByNameAndAccount_id(campaignDTO.getCampaignName(), account.getId());
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
//        Account account = accountRepository.findAccountById(1);
        campaign.setAccount_id(account.getId());
        List<String> mailLists = new ArrayList<>();
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                mailLists.add(mailList[i]);
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
                campaignSubcriber.setCreatedTime("");
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);
            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
            campaignGroupContact.setCampaign(campaign);
            return campaignGroupContact;
        }).collect(Collectors.toList());

        campaign.setCampaignGroupContacts(campaignGroupContacts);


        campaignRepository.save(campaign);
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
        Date dateSchedule = calendar.getTime();
        long delay = dateSchedule.getTime() - System.currentTimeMillis();
        ScheduledExecutorService ses = Executors.newSingleThreadScheduledExecutor();
        ses.schedule(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int counter = 0; counter < mailLists.size(); counter++) {
                        String messageId = mailService.sendSimpleMessageV2(campaign.getSender(), campaign.getFromMail(), mailLists.get(counter), campaign.getSubject(), campaign.getContent());
                        CampaignSubcriber campaignSubcriber = campaignSubcriberRepository.changeConfirmSend(campaign.getId(), mailLists.get(counter));
                        campaignSubcriber.setSend(true);
                        campaignSubcriber.setMessageId(messageId.trim()); //mỗi lần chạy là tự tạo ha?
                        campaignSubcriberRepository.save(campaignSubcriber);
                    }

                } catch (MailException e) {
                    Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
                }

            }

        }, delay, TimeUnit.MILLISECONDS);
        campaignRepository.save(campaign);
        ses.shutdown();
        return true;
    }


    @Override
    public boolean createAutoResponseCampaign(MailObjectDTO mailObjectDTO, int groupId, Template template) {
        return false;
    }

    @Override
    public boolean editCampaign(MailObjectDTO mailObjectDTO, CampaignDTO campaignDTO, int id) {
        Campaign campaignEdit = campaignRepository.findCampaignById(id);
        if (campaignEdit.getStatus() == "Done") {
            return false;
        }
//        campaignSubcriberRepository.clearCampaignSubcriber(id);
        List<CampaignSubcriber> subcribers = campaignSubcriberRepository.findCampaignSubcriberByCampaignId(id);
        campaignSubcriberRepository.deleteInBatch(subcribers);
        campaignSubcriberRepository.flush();
        Account account = accountRepository.findAccountById(1);
        campaignGroupContactRepository.deleteCampaignFromCampaginGroup(id);
        campaignEdit.setAccount_id(account.getId());
        campaignEdit.setName(campaignDTO.getCampaignName());
        campaignEdit.setBodyJson(mailObjectDTO.getBodyJson());
        campaignEdit.setContent(mailObjectDTO.getBody());
        campaignEdit.setSender(mailObjectDTO.getFrom());
        campaignEdit.setFromMail(mailObjectDTO.getFromMail());
        campaignEdit.setSubject(mailObjectDTO.getSubject());
        campaignEdit.setUpdatedTime(LocalDateTime.now().toString());
        List<CampaignGroupContact> campaignGroupContacts = campaignDTO.getGcCampaignDTOS().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            campaignGroupContact.setUpdatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
                campaignSubcriber.setCreatedTime("");
                campaignSubcriber.setCampaignGroupContact(campaignGroupContact);
                campaignSubcriber.setSubcriberEmail(mailList[i]);
                campaignSubcribers.add(campaignSubcriber);
                campaignSubcriber.setOpened(false);
                campaignSubcriber.setSend(false);
            }
            campaignGroupContact.setCampaignSubcribers(campaignSubcribers);
            campaignGroupContact.setCampaign(campaignEdit);
            return campaignGroupContact;
        }).collect(Collectors.toList());

        campaignEdit.setCampaignGroupContacts(campaignGroupContacts);

        campaignRepository.save(campaignEdit);
        return true;
    }

    @Override
    public Campaign addContentToCampaign(Campaign campaign) {
        Campaign campaignEdit = campaignRepository.findCampaignById(campaign.getId());
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

        List<GCCampaignDTO> gcCampaignDTOs = campaign.getCampaignGroupContacts().stream().map(g -> {
            GCCampaignDTO gcCampaignDTO = new GCCampaignDTO();
            gcCampaignDTO.setGroupContactId(g.getGroupContact().getId());

            return gcCampaignDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setGcCampaignDTOS(gcCampaignDTOs);
        //Statistic
        campaignFullDTO.setRequest(campaign.getRequest());
        campaignFullDTO.setOpen(campaign.getOpenRate());
        campaignFullDTO.setBounce(campaign.getBounce());
        campaignFullDTO.setDelivery(campaign.getDelivery());
        campaignFullDTO.setClick(campaign.getClickRate());
        campaignFullDTO.setSpam(campaign.getSpamRate());
        //Contact Request
        List<Subcriber> contactRequest = campaignSubcriberRepository.findSubcriberByCampaignID(campaign.getId());
        List<SubcriberViewDTO>contactRequestDto = contactRequest.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactRequest(contactRequestDto);
        //Contact Delivery
        List<Subcriber> contactDelivery = campaignSubcriberRepository.findSubcriberByCampaignAndDelivery(campaign.getId(),true);
        List<SubcriberViewDTO>contactDeliveryDto = contactDelivery.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactDelivery(contactDeliveryDto);
        //Contact Opened
        List<Subcriber> contactOpened = campaignSubcriberRepository.findSubcriberByCampaignAndOpened(campaign.getId(),true);
        List<SubcriberViewDTO>contactOpenDto = contactOpened.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactOpened(contactOpenDto);
        //Contact Bounce
        List<Subcriber> contactBounce = campaignSubcriberRepository.findSubcriberByCampaignAndBounce(campaign.getId(),true);
        List<SubcriberViewDTO>contactBounceDTO = contactBounce.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactBounce(contactBounceDTO);
        //Contact Clicked
        List<Subcriber> contactClick = campaignSubcriberRepository.findSubcriberByCampaignAndClicked(campaign.getId(),true);
        List<SubcriberViewDTO>contactClickDTO = contactClick.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactClicked(contactClickDTO);
        //Contact Spam
        List<Subcriber> contactSpam = campaignSubcriberRepository.findSubcriberByCampaignAndSpam(campaign.getId(),true);
        List<SubcriberViewDTO>contactSpamDTO = contactSpam.stream().map(g->{
            SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
            subcriberViewDTO.setFirstName(g.getFirstName());
            subcriberViewDTO.setLastName(g.getLastName());
            subcriberViewDTO.setId(g.getId());
            subcriberViewDTO.setEmail(g.getEmail());
            subcriberViewDTO.setType(g.getType());
            return subcriberViewDTO;
        }).collect(Collectors.toList());
        campaignFullDTO.setContactSpam(contactSpamDTO);
        return campaignFullDTO;
    }

    @Override
    public int copyCampaign(int campaignId, int workflowId) {

        Campaign temp = campaignRepository.findCampaignById(campaignId);
        Workflow workflow = workflowRepository.findWorkflowById(workflowId);
        if (temp == null || workflow == null) {
            return 1;
        }

        Campaign campaign = new Campaign();
        List<CampaignGroupContact> campaignGroupContacts = workflow.getWorkflowGroupContacts().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(g.getGroupContact());
            campaignGroupContact.setCampaign(campaign);
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            //Add Subcriber To Appointments
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
                campaignSubcriber.setCreatedTime("");
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
        campaign.setName(temp.getName() +"<"+ workflow.getName() + ">"+UUID.randomUUID().toString());
        campaignRepository.save(campaign);
        return campaign.getId();
    }


    @Override
    public void getStatisticCampaign() {
        log.info("Get Statistic Campaign.");
        for (Campaign campaign : campaignRepository.findAll()) {
            // Get Statistic of Campaign
            double request = campaignSubcriberRepository.countRequest(campaign.getId());
            double bounce = campaignSubcriberRepository.countBounce(campaign.getId());
            double delivery = campaignSubcriberRepository.countDelivery(campaign.getId());
            double open = campaignSubcriberRepository.countOpen(campaign.getId());
            double click = campaignSubcriberRepository.countClick(campaign.getId());
            double spam = campaignSubcriberRepository.countSpam(campaign.getId());
            String requestStr = String.valueOf((int) request);

//                    String requestStr =new Double(request).toString();
            campaign.setRequest(requestStr);
            campaign.setOpenRate(String.valueOf((int) open));
            campaign.setBounce(String.valueOf((int) bounce));
            campaign.setDelivery(String.valueOf((int) delivery));
            campaign.setClickRate(String.valueOf((int) click));
            campaign.setSpamRate(String.valueOf((int) spam));

            campaignRepository.save(campaign);
        }
    }

    @Override
    public CampaignFullDTO getCampaignLatest(Account account) {
//        Campaign campaign = campaignRepository.findTopByOrderByCreatedTimeDesc();
            Campaign campaign = campaignRepository.findTopByAccount_idAndAutomationIsFalseAndStatusContainsOrderByCreatedTimeDesc(account.getId(),"Done");
        // Get Statistic of Campaign
        CampaignFullDTO campaignFullDTO = new CampaignFullDTO();
        campaignFullDTO.setCampaignName(campaign.getName());
        campaignFullDTO.setRequest(campaign.getRequest());
        campaignFullDTO.setCreatedTime(campaign.getCreatedTime());
        campaignFullDTO.setOpen(campaign.getOpenRate());
        campaignFullDTO.setBounce(campaign.getBounce());
        campaignFullDTO.setDelivery(campaign.getDelivery());
        campaignFullDTO.setClick(campaign.getClickRate());
        campaignFullDTO.setSpam(campaign.getSpamRate());

        return campaignFullDTO;
    }

    @Override
    public boolean copyCampaign(int campaignId, String name) {
        Campaign temp = campaignRepository.findCampaignById(campaignId);
        Campaign checked = campaignRepository.findByNameAndAccount_id(name, temp.getAccount_id());
        if (temp == null || checked != null) {
            return false;
        }
        Campaign campaign = new Campaign();
        List<CampaignGroupContact> campaignGroupContacts = temp.getCampaignGroupContacts().stream().map(g -> {
            CampaignGroupContact campaignGroupContact = new CampaignGroupContact();
            campaignGroupContact.setGroupContact(groupContactRepository.findGroupById(g.getGroupContact().getId()));
            campaignGroupContact.setCreatedTime(LocalDateTime.now().toString());
            String[] mailList = groupContactRepository.findSubcriberMailByGroupContactId(campaignGroupContact.getGroupContact().getId());
            List<CampaignSubcriber> campaignSubcribers = new ArrayList<>();
            for (int i = 0; i < mailList.length; i++) {
                CampaignSubcriber campaignSubcriber = new CampaignSubcriber();
                campaignSubcriber.setComfirmation(false);
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
        campaign.setAccount_id(1);
        campaign.setCampaignGroupContacts(campaignGroupContacts);
        campaign.setAutomation(false);
        campaign.setTimeStart(temp.getTimeStart());
        campaign.setStatus("Draft");
        campaign.setBodyJson(temp.getBodyJson());
        campaign.setFromMail(temp.getFromMail());
        campaign.setSubject(temp.getSubject());
        campaign.setSender(temp.getSender());
        campaign.setContent(temp.getContent());
        campaign.setType(temp.getType());
        campaign.setName(name);
        campaignRepository.save(campaign);
        return true;
    }

    @Override
    public boolean checkDuplicatName(String name, int accountId) {
        Campaign campaign = campaignRepository.findByNameAndAccount_id(name, accountId);
        if (campaign != null) {
            return false;
        }
        return true;
    }


}
