package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubcriberServiceImpl implements SubcriberService {


    @Autowired
    SubcriberRepository subcriberRepository;



    @Override
    public boolean createSubcrbier(Subcriber subcriber) {
        System.out.println(subcriber.getName());
        Subcriber checkExistedSubcriber = subcriberRepository.findByEmail(subcriber.getEmail());
        if (checkExistedSubcriber != null) {
            return false;
        }
        subcriber.setCreatedTime(LocalDateTime.now().toString());
        subcriber.setEmail(subcriber.getEmail());
        subcriberRepository.save(subcriber);
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
    public Subcriber getSubcriberByEmail(String email) {
        return subcriberRepository.findSubcriberByEmail(email);
    }

    @Override
    public List<Subcriber> searchByNameorEmail(String searchValue) {
        return subcriberRepository.searchByEmailAndName(searchValue);
    }


}
