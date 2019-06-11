package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.GroupContact;
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
    GroupContactRepository GroupContactRepository;

    @Override
    public boolean createGroupContact(GroupContact GroupContact) {
        System.out.println(GroupContact.getName());
        GroupContact checkExistedGroupContact = GroupContactRepository.findByName(GroupContact.getName());
        if (checkExistedGroupContact != null) {
            return false;
        }
        GroupContact.setCreatedTime(LocalDateTime.now().toString());
        GroupContact.setName(GroupContact.getName());
        GroupContact.setDescription(GroupContact.getDescription());
        GroupContactRepository.save(GroupContact);
        return true;
    }

    @Override
    public List<GroupContact> getAllGroupContacts() {
        return GroupContactRepository.findAll();
    }

    @Override
    public GroupContact editGroupContact(GroupContact GroupContact) {
        try {
            GroupContact checkExistedGroupContact = GroupContactRepository.findGroupById(GroupContact.getId());
            if (checkExistedGroupContact != null) {
                System.out.println("TEST");
                checkExistedGroupContact.setName(GroupContact.getName());
                checkExistedGroupContact.setDescription(GroupContact.getDescription());
                checkExistedGroupContact.setUpdatedTime(LocalDateTime.now().toString());

                return GroupContactRepository.save(checkExistedGroupContact);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public GroupContact getGroupContactByName(String name) {
        return GroupContactRepository.findByName(name);
    }

    @Override
    public GroupContact updateGroupContact(GroupContact GroupContact) {
        return null;
    }

    @Override
    public int countTotalGroupContact(int GroupContactId) {
        return GroupContactRepository.countAllById(GroupContactId);
    }

    @Override
    public GroupContact createNewGroupContact(GroupContact GroupContact) {
        return GroupContactRepository.save(GroupContact);
    }

    @Override
    public List<GroupContact> searchByName(String searchValue) {
        return GroupContactRepository.searchByName(searchValue);
    }
}
