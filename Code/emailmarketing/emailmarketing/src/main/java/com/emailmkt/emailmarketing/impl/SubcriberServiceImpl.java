package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.*;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.*;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubcriberServiceImpl implements SubcriberService {

    private static final Logger log = LoggerFactory.getLogger(SubcriberServiceImpl.class);
    @Autowired
    SubcriberRepository subcriberRepository;

    @Autowired
    GroupContactRepository groupContactRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AppointmentSubcriberRepository appointmentSubcriberRepository;

    @Autowired
    CampaignSubcriberRepository campaignSubcriberRepository;

    @Autowired
    GroupContactSubcriberRepository groupContactSubcriberRepository;


    @Override
    public boolean createSubcrbier(SubcriberDTO dto) {
        System.out.println(dto.getEmail());
        Subcriber checkExistedSubcriber = subcriberRepository.findByEmail(dto.getEmail());
        if (checkExistedSubcriber != null) {

            return false;
        }
        Subcriber subcriber = new Subcriber();

        subcriber.setCreatedTime(LocalDateTime.now().toString());
        subcriber.setEmail(dto.getEmail());
        subcriber.setTag(dto.getTag());
        subcriber.setAddress(dto.getAddress());
        subcriber.setPhone(dto.getPhone());
        subcriber.setFirstName(dto.getFirstName());
        subcriber.setLastName(dto.getLastName());
        subcriber.setType("Beginner Contacts");
        Account account = accountRepository.findAccountById(1);
        subcriber.setAccount_id(account.getId());
        List<GroupContactSubcriber> groupContactSubcribers = dto.getGcSubcriberDTOS().stream().map(g -> {
            GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
            groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            groupContactSubcriber.setActive(true);
            groupContactSubcriber.setCreatedTime(LocalDateTime.now().toString());
            groupContactSubcriber.setSubcriber(subcriber);

            return groupContactSubcriber;
        }).collect(Collectors.toList());
        subcriber.setGroupContactSubcribers(groupContactSubcribers);
        subcriberRepository.save(subcriber);
        return true;
    }

    @Override
    public boolean createSubcriberForm(SubcriberFormDTO dto) {
        System.out.println(dto.getEmail());
        Subcriber checkExistedSubcriber = subcriberRepository.findByEmail(dto.getEmail());
        if (checkExistedSubcriber != null) {
            return false;
        }
        Subcriber subcriber = new Subcriber();

        subcriber.setLastName(dto.getLastName());

        subcriber.setCreatedTime(LocalDateTime.now().toString());
        subcriber.setEmail(dto.getEmail());
        subcriber.setFirstName(dto.getFirstName());
        subcriber.setType("Beginner Contacts");
        Account account = accountRepository.findAccountById(1);
        subcriber.setAccount_id(account.getId());
        List<GroupContactSubcriber> groupContactSubcribers = new ArrayList<>();

        GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
        groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(1));
        groupContactSubcriber.setSubcriber(subcriber);
        groupContactSubcriber.setActive(true);
        groupContactSubcribers.add(groupContactSubcriber);
        subcriber.setGroupContactSubcribers(groupContactSubcribers);
        subcriberRepository.save(subcriber);
        return true;
    }

    @Override
    public boolean createListSubcrbier(List<SubcriberDTO> subcriberDTOS) {
        boolean check = false;
        for (SubcriberDTO subcriberDTO : subcriberDTOS) {

            Subcriber result = subcriberRepository.findByEmail(subcriberDTO.getEmail());

            if (result != null) {
                List<GroupContactSubcriber> groupContactSubcribers2 = result.getGroupContactSubcribers();
                for (GroupContactSubcriber groupContactSubcriber2 : groupContactSubcribers2) {
                    subcriberDTO.getGcSubcriberDTOS().stream().forEach(x -> {
                        if (groupContactSubcriber2.getGroupContact().getId() == x.getGroupContactId()) {
                            if (!groupContactSubcriber2.isActive()) {
                                groupContactSubcriber2.setActive(true);
                                groupContactSubcriberRepository.save(groupContactSubcriber2);
                            }
                            return;


                        }


                        GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
                        groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(x.getGroupContactId()));
                        groupContactSubcriber.setSubcriber(result);
                        groupContactSubcribers2.add(groupContactSubcriber);
                        result.setGroupContactSubcribers(groupContactSubcribers2);
                        subcriberRepository.save(result);


                    });

                }
                return false;
            }


            Subcriber subcriber = new Subcriber();
            subcriber.setLastName(subcriberDTO.getLastName());
            subcriber.setFirstName(subcriberDTO.getFirstName());
            subcriber.setDob(subcriberDTO.getDob());
            subcriber.setEmail(subcriberDTO.getEmail());
            subcriber.setAddress(subcriberDTO.getAddress());
            subcriber.setPhone(subcriberDTO.getPhone());
            subcriber.setLastName(subcriberDTO.getLastName());
            subcriber.setFirstName(subcriberDTO.getFirstName());
            subcriber.setCreatedTime(LocalDateTime.now().toString());
            subcriber.setType(subcriberDTO.getType());
            subcriber.setTag(subcriberDTO.getTag());
            Account account = accountRepository.findAccountById(1);
            subcriber.setAccount_id(account.getId());
            List<GroupContactSubcriber> groupContactSubcribers = subcriberDTO.getGcSubcriberDTOS().stream().map(g -> {
                GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
                groupContactSubcriber.setActive(true);
                groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
                groupContactSubcriber.setCreatedTime(LocalDateTime.now().toString());
                groupContactSubcriber.setSubcriber(subcriber);
                return groupContactSubcriber;
            }).collect(Collectors.toList());
            subcriber.setGroupContactSubcribers(groupContactSubcribers);
            subcriberRepository.save(subcriber);

        }

        return true;
    }


    @Override
    public Subcriber editSubcriber(Subcriber subcriber) {
        return null;
    }


    @Override
    public void getStatisticSubcriber() {

        log.info("Get Statistic By Subcriber .\n");
        for (Subcriber subcriber : subcriberRepository.findAll()) {

            double requestCampaign = campaignSubcriberRepository.countCampaignSubcriberBySubcriberEmail(subcriber.getEmail());
            double requestAppointment = appointmentSubcriberRepository.countAppointmentSubcriberBySubcriberEmail(subcriber.getEmail());
            double total = requestAppointment + requestCampaign;
            double totalOpen = campaignSubcriberRepository.countBySubcriberEmailAndOpened(subcriber.getEmail(), true)
                    + appointmentSubcriberRepository.countBySubcriberEmailAndOpened(subcriber.getEmail(), true);
            double totalClick = campaignSubcriberRepository.countBySubcriberEmailAndComfirmation(subcriber.getEmail(), true) + appointmentSubcriberRepository.countBySubcriberEmailAndConfirmation(subcriber.getEmail(), true);
            subcriber.setOpenRate(Math.round(totalOpen / total) * 100 + "%");
            subcriber.setClickRate(Math.round(totalClick / total) * 100 + "%");
            if ((Math.round(totalClick / total) * 100) > 80 && Math.round(totalOpen / total) * 100 > 80 || total > 7) {
                subcriber.setType("Advanced Contacts");
            } else if ((Math.round(totalClick / total) * 100) > 50 && Math.round(totalOpen / total) * 100 > 50 && total > 5) {
                subcriber.setType("Intermediate Contacts");
            } else {
                subcriber.setType("Beginner Contacts");
            }
            subcriberRepository.save(subcriber);
        }


    }

    @Override
    public List<Subcriber> getContactLatest() {
        return subcriberRepository.findTop5ByOrderByCreatedTimeDesc();
    }

    @Override
    public List<Subcriber> getSubcriberByTag(String tag) {
        return subcriberRepository.findSubcriberByTag(tag);
    }

    @Override
    public SubcriberViewDTO getSubcriberById(int id) {
        SubcriberViewDTO subcriberViewDTO = new SubcriberViewDTO();
        Subcriber subcriber = subcriberRepository.findSubcriberById(id);
        subcriberViewDTO.setAddress(subcriber.getAddress());
        subcriberViewDTO.setType(subcriber.getType());
        subcriberViewDTO.setFirstName(subcriber.getFirstName());
        subcriberViewDTO.setLastName(subcriber.getLastName());
        subcriberViewDTO.setDob(subcriber.getDob());
        subcriberViewDTO.setEmail(subcriber.getEmail());
        subcriberViewDTO.setPhone(subcriber.getPhone());
        int belongGroup = groupContactSubcriberRepository.countAllBySubcriberId(subcriber.getId());
        int belongCampaign = campaignSubcriberRepository.countAllBySubcriberEmail(subcriber.getEmail());
        subcriberViewDTO.setClickRate(subcriber.getClickRate());
        subcriberViewDTO.setOpenRate(subcriber.getOpenRate());
        subcriberViewDTO.setBelongCampaign(belongCampaign);
        subcriberViewDTO.setBelongGroup(belongGroup);
        return subcriberViewDTO;
    }


    @Override
    public List<Subcriber> getSubcriberByAccountId(int accountId) {
        return subcriberRepository.findSubcriberByAccount_id(accountId);
    }

    @Override
    public Subcriber updateSubcriber(Subcriber subcriber) {
        return null;
    }

    @Override
    public int countTotalSubcriber(int subcriberId) {
        return subcriberRepository.countAllById(subcriberId);
    }

    @Override
    public StatisticContactDTO countSubcriber() {
        StatisticContactDTO statisticContactDTO = new StatisticContactDTO();
        statisticContactDTO.setBeginerContact(subcriberRepository.countByType("Beginner Contacts"));
        statisticContactDTO.setIntermediateContact(subcriberRepository.countByType("Intermediate Contacts"));
        statisticContactDTO.setAdvancedContact(subcriberRepository.countByType("Advanced Contacts"));
        return statisticContactDTO;
    }


    @Override
    public Subcriber getSubcriberByEmail(String email) {
        return subcriberRepository.findSubcriberByEmail(email);
    }

    @Override
    public List<Subcriber> searchByNameorEmail(String searchValue) {
        return subcriberRepository.searchByEmailAndName(searchValue);
    }

    @Override
    public List<SubcriberDTO> getAllSubcriberV2() {

        List<Subcriber> subcribers = groupContactSubcriberRepository.findAllSubcriberIsActive();

        List<SubcriberDTO> dtos = new ArrayList<>();
        for (Subcriber subcriber : subcribers) {
            SubcriberDTO dto = new SubcriberDTO();
            dto.setId(subcriber.getId());
            dto.setEmail(subcriber.getEmail());
            dto.setLastName(subcriber.getLastName());
            dto.setFirstName(subcriber.getFirstName());
            dto.setDob(subcriber.getDob());
            dto.setPhone(subcriber.getPhone());
            dto.setAddress(subcriber.getAddress());
            dto.setTag(subcriber.getTag());
            dto.setType(subcriber.getType());
            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    public String deleteSubcriber(int id, int groupId) {
        GroupContactSubcriber groupContactSubcriber = groupContactSubcriberRepository.findGroupContactSubcriberBySubcriberIdAndGroupContactId(id, groupId);

        if (groupContactSubcriber == null) {
            return "This subcriber is not exist!";
        }
        if (groupId == 1) {
            subcriberRepository.deleteSubcriberFromGroup(id);
            return "delete all success";
        } else {
            groupContactSubcriberRepository.deleteSubcriberFromGroup(id, groupId);
            return "sucess";
        }


//

    }

    @Override
    public List<Subcriber> getSubcriberBySegment(List<SegmentDTO> segmentDTOs, String condition) {
        List<Subcriber> subcribers = new ArrayList(new LinkedHashSet());

        for (SegmentDTO segmentDTO : segmentDTOs) {
            List<Subcriber> subcriberList = new ArrayList<>();
            if (segmentDTO.getSelect1().equalsIgnoreCase("Contact Details")) {
                //Name
                if (segmentDTO.getSelect2().equalsIgnoreCase("Name")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is")) {
                        subcriberList = subcriberRepository.findAllByLastNameIs(segmentDTO.getSelect4());
                    } else if (segmentDTO.getSelect3().equalsIgnoreCase("is not")) {
                        subcriberList = subcriberRepository.findAllByLastNameIsNot(segmentDTO.getSelect4());
                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("contains")) {
                        subcriberList = subcriberRepository.findAllByLastNameContains(segmentDTO.getSelect4());

                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("doesn't contains")) {
                        subcriberList = subcriberRepository.findAllByLastNameNotLike(segmentDTO.getSelect4());
                    }
                }
                //Email
                if (segmentDTO.getSelect2().equalsIgnoreCase("Email")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is")) {
                        subcriberList = subcriberRepository.findAllByEmailIs(segmentDTO.getSelect4());
                    } else if (segmentDTO.getSelect3().equalsIgnoreCase("is not")) {
                        subcriberList = subcriberRepository.findAllByEmailIsNot(segmentDTO.getSelect4());
                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("contains")) {
                        subcriberList = subcriberRepository.findAllByEmailContains(segmentDTO.getSelect4());

                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("doesn't contains")) {
                        subcriberList = subcriberRepository.findAllByEmailNotLike(segmentDTO.getSelect4());
                    }
                }
                //Birthday
                if (segmentDTO.getSelect2().equalsIgnoreCase("Birthday")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is before")) {
                        subcriberList = subcriberRepository.findAllByDobBefore(segmentDTO.getSelect4());
                    } else if (segmentDTO.getSelect3().equalsIgnoreCase("is after")) {
                        subcriberList = subcriberRepository.findAllByDobAfter(segmentDTO.getSelect4());
                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is on")) {
                        subcriberList = subcriberRepository.findAllByDob(segmentDTO.getSelect4());
                    }
                }
                //Address
                if (segmentDTO.getSelect2().equalsIgnoreCase("Address")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("contains")) {
                        subcriberList = subcriberRepository.findAllByAddressContains(segmentDTO.getSelect4());
                    }
                }
                //Create Time
                if (segmentDTO.getSelect2().equalsIgnoreCase("Subscription date")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is before")) {
                        subcriberList = subcriberRepository.findAllByCreatedTimeBefore(segmentDTO.getSelect4());
                    } else if (segmentDTO.getSelect3().equalsIgnoreCase("is after")) {
                        subcriberList = subcriberRepository.findAllByCreatedTimeAfter(segmentDTO.getSelect4());
                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is on")) {
                        subcriberList = subcriberRepository.findAllByCreatedTime(segmentDTO.getSelect4());
                    }
                }
                //Group
                if (segmentDTO.getSelect2().equalsIgnoreCase("Group")) {
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is")) {
                        subcriberList = subcriberRepository.findAllByGroupContact(Integer.valueOf(segmentDTO.getSelect4()));
                    }
                    if (segmentDTO.getSelect3().equalsIgnoreCase("is not group")) {
                        subcriberList = subcriberRepository.findAllByGroupContactNot(Integer.valueOf(segmentDTO.getSelect4()));
                    }
                }
            } else {
                //Mail not Opened
                if (segmentDTO.getSelect1().equalsIgnoreCase("Contact Actions")) {
                    //Mail Not Opened
                    if (segmentDTO.getSelect2().equalsIgnoreCase("Mail not opened")) {
                        if (segmentDTO.getSelect2().equalsIgnoreCase("Campaign")) {
                            List<String> subcriberMails = campaignSubcriberRepository.findSubcriberMailByCampaignAndOpened(Integer.valueOf(segmentDTO.getSelect4()), false);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                        if (segmentDTO.getSelect2().equalsIgnoreCase("appointment")) {
                            List<String> subcriberMails = appointmentSubcriberRepository.findSubcriberMailByAppointmentAndOpened(Integer.valueOf(segmentDTO.getSelect4()), false);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                    }

                    //Mail Opened
                    if (segmentDTO.getSelect2().equalsIgnoreCase("Mail opened")) {
                        if (segmentDTO.getSelect3().equalsIgnoreCase("Campaign")) {
                            List<String> subcriberMails = campaignSubcriberRepository.findSubcriberMailByCampaignAndOpened(Integer.valueOf(segmentDTO.getSelect4()), true);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                        if (segmentDTO.getSelect3().equalsIgnoreCase("appointment")) {
                            List<String> subcriberMails = appointmentSubcriberRepository.findSubcriberMailByAppointmentAndOpened(Integer.valueOf(segmentDTO.getSelect4()), true);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                    }
                    //Mail Clicked
                    if (segmentDTO.getSelect2().equalsIgnoreCase("Mail clicked")) {
                        if (segmentDTO.getSelect2().equalsIgnoreCase("Campaign")) {
                            List<String> subcriberMails = campaignSubcriberRepository.findSubcriberMailByCampaignAndClicked(Integer.valueOf(segmentDTO.getSelect4()), true);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                        if (segmentDTO.getSelect2().equalsIgnoreCase("appointment")) {
                            List<String> subcriberMails = appointmentSubcriberRepository.findSubcriberMailByAppointmentAndClicked(Integer.valueOf(segmentDTO.getSelect4()), true);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                    }

                    //Mail not clicked
                    if (segmentDTO.getSelect2().equalsIgnoreCase("Mail clicked")) {
                        if (segmentDTO.getSelect2().equalsIgnoreCase("Campaign")) {
                            List<String> subcriberMails = campaignSubcriberRepository.findSubcriberMailByCampaignAndClicked(Integer.valueOf(segmentDTO.getSelect4()), false);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                        if (segmentDTO.getSelect2().equalsIgnoreCase("appointment")) {
                            List<String> subcriberMails = appointmentSubcriberRepository.findSubcriberMailByAppointmentAndClicked(Integer.valueOf(segmentDTO.getSelect4()), false);
                            for (String subcriberMail : subcriberMails) {
                                Subcriber subcriber = subcriberRepository.findSubcriberByEmail(subcriberMail);
                                subcriberList.add(subcriber);
                            }

                        }
                    }
                }
            }
            if (condition.equalsIgnoreCase("or")) {
                subcribers.addAll(subcriberList);
            }
            if (condition.equalsIgnoreCase("and")) {
                if (subcribers.isEmpty()) {
                    subcribers.addAll(subcriberList);
                }
                subcribers.retainAll(subcriberList);
            }


        }
        return subcribers;

    }


}
