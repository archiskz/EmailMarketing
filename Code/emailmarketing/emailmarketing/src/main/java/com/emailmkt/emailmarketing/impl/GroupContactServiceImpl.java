package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.GroupContactRepository;
import com.emailmkt.emailmarketing.service.GroupContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GroupContactServiceImpl implements GroupContactService {

    @Autowired
    GroupContactRepository groupContactRepository;


    @Override
    public boolean createGroupContact(GroupContact GroupContact) {
        System.out.println(GroupContact.getName());
        GroupContact checkExistedGroupContact = groupContactRepository.findByName(GroupContact.getName());
        if (checkExistedGroupContact != null) {
            return false;
        }
        GroupContact.setCreatedTime(LocalDateTime.now().toString());
        GroupContact.setName(GroupContact.getName());
        GroupContact.setDescription(GroupContact.getDescription());
        groupContactRepository.save(GroupContact);
        return true;
    }

    @Override
    public List<GroupContact> getAllGroupContacts() {
        return groupContactRepository.findAll();
    }

    @Override
    public GroupContact editGroupContact(GroupContact GroupContact) {
        try {
            GroupContact checkExistedGroupContact = groupContactRepository.findGroupById(GroupContact.getId());
            if (checkExistedGroupContact != null) {
                System.out.println("TEST");
                checkExistedGroupContact.setName(GroupContact.getName());
                checkExistedGroupContact.setDescription(GroupContact.getDescription());
                checkExistedGroupContact.setUpdatedTime(LocalDateTime.now().toString());

                return groupContactRepository.save(checkExistedGroupContact);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public GroupContact getGroupContactByName(String name) {
        return groupContactRepository.findByName(name);
    }

    @Override
    public GroupContact updateGroupContact(GroupContact GroupContact) {
        return null;
    }

    @Override
    public Long countTotalGroupContacts() {
        return groupContactRepository.countTotalGroupContacts();
    }



    @Override
    public GroupContact createNewGroupContact(GroupContact GroupContact) {
        return groupContactRepository.save(GroupContact);
    }

    @Override
    public List<GroupContact> searchByName(String searchValue) {
        return groupContactRepository.searchByName(searchValue);
    }

    @Override
    public List<GroupContactSubcriber> getAllSubcriber() {
        return groupContactRepository.getAllSubcriber();
    }

    @Override
    public List<Subcriber> findSubcriberByGroupContactId(String groupContactId) {
        return groupContactRepository.findSubcriberByGroupContactId(groupContactId);
    }





    @Override
    public Long countTotalContactsByGroupId(String groupContactId ) {
        return groupContactRepository.countTotalContactsByGroupId(groupContactId);
    }
}
