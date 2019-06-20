package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.repository.GroupContactRepository;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubcriberServiceImpl implements SubcriberService {


    @Autowired
    SubcriberRepository subcriberRepository;

    @Autowired
    GroupContactRepository groupContactRepository;

    @Autowired
    AccountRepository accountRepository;



    @Override
    public boolean createSubcrbier(SubcriberDTO dto) {
        System.out.println(dto.getName());
        Subcriber checkExistedSubcriber = subcriberRepository.findByEmail(dto.getEmail());
        if (checkExistedSubcriber != null) {
            return false;
        }
        Subcriber subcriber = new Subcriber();
        subcriber.setCreatedTime(LocalDateTime.now().toString());
        subcriber.setEmail(dto.getEmail());
        subcriber.setTag(dto.getTag());
        subcriber.setType("New Subcriber");
        Account account = accountRepository.findAccountById(1);
        subcriber.setAccount_id(account.getId() + "");
        List<GroupContactSubcriber> groupContactSubcribers = dto.getGcSubcriberDTOS().stream().map(g->{
            GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
            groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(g.getGroupContactId()));
            groupContactSubcriber.setCreatedTime(LocalDateTime.now().toString());
            groupContactSubcriber.setSubcriber(subcriber);
            return groupContactSubcriber;
        }).collect(Collectors.toList());
        subcriber.setGroupContactSubcribers(groupContactSubcribers);
        subcriberRepository.save(subcriber);
        return true;
    }

    @Override
    public boolean createListSubcrbier(List<SubcriberDTO> dto) {
        List<Subcriber> subcribers = subcriberRepository.findByEmailInList(subcriberRepository.listEmailSubcriber());




        Subcriber subcriber = new Subcriber();


        return true;
    }


    @Override
    public List<Subcriber> getAllSubcribers() {
        return subcriberRepository.findAll();

    }




    @Override
    public Subcriber editSubcriber(Subcriber subcriber) {
        return null;
    }

    @Override
    public List<Subcriber> getSubcriberByTag(String tag) {
        return subcriberRepository.findSubcriberByTag(tag);
    }

    @Override
    public Subcriber getSubcriberById(int id) {
        return subcriberRepository.findSubcriberById(id);
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
    public Subcriber createNewSubcriber(Subcriber subcriber) {
        return subcriberRepository.save(subcriber);
    }

    @Override
    public boolean createSubcriberNormal(SubcriberDTO dto) {
        System.out.println(dto.getName());
        Subcriber checkExistedSubcriber = subcriberRepository.findByEmail(dto.getEmail());
        if (checkExistedSubcriber != null) {
            return false;
        }
        Subcriber subcriber = new Subcriber();
        subcriber.setCreatedTime(LocalDateTime.now().toString());
        subcriber.setEmail(dto.getEmail());
        subcriber.setTag(dto.getTag());
        subcriber.setType("New Subcriber");
        Account account = accountRepository.findAccountById(1);
        subcriber.setAccount_id(account.getId() + "");
        List<GroupContactSubcriber> groupContactSubcribers = dto.getGcSubcriberDTOS().stream().map(g->{
            GroupContactSubcriber groupContactSubcriber = new GroupContactSubcriber();
            groupContactSubcriber.setGroupContact(groupContactRepository.findGroupById(1));
            groupContactSubcriber.setCreatedTime(LocalDateTime.now().toString());
            groupContactSubcriber.setSubcriber(subcriber);
            return groupContactSubcriber;
        }).collect(Collectors.toList());
        subcriber.setGroupContactSubcribers(groupContactSubcribers);
        subcriberRepository.save(subcriber);
        return true;
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
        List<Subcriber>subcribers = subcriberRepository.findAll();
        List<SubcriberDTO> dtos = new ArrayList<>();
        for(Subcriber subcriber : subcribers){
            SubcriberDTO dto = new SubcriberDTO();
            dto.setId(subcriber.getId());
            dto.setEmail(subcriber.getEmail());
            dto.setName(subcriber.getName());
            dto.setTag(subcriber.getName());
            dto.setType(subcriber.getType());
            dtos.add(dto);
        }
        return dtos;
    }


}
