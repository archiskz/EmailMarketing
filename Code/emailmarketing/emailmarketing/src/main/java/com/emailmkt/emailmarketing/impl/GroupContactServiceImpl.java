package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.dto.GroupContactDTO;
import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.GroupContactRepository;
import com.emailmkt.emailmarketing.service.GroupContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class GroupContactServiceImpl implements GroupContactService {

    @Autowired
    GroupContactRepository groupContactRepository;


    @Override
    public boolean createGroupContact(GroupContactDTO groupContactDTO) {
        System.out.println(groupContactDTO.getName());
        GroupContact checkExistedGroupContact = groupContactRepository.findByName(groupContactDTO.getName());
        if (checkExistedGroupContact != null) {
            return false;
        }
        GroupContact groupContact = new GroupContact();
        groupContact.setCreatedTime(LocalDateTime.now().toString());
        groupContact.setName(groupContactDTO.getName());
        groupContact.setDescription(groupContactDTO.getDescription());
        groupContact.setAccount_id(1);
        groupContactRepository.save(groupContact);
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
    public GroupContact getGroupById(int id) {
        return groupContactRepository.findGroupById(id);

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
    public List<SubcriberDTO> findSubcriberByGroupContactId(int groupContactId) {
        List<Subcriber>subcribers = groupContactRepository.findSubcriberByGroupContactId(groupContactId);
        List<SubcriberDTO> dtos = new ArrayList<>();
        for(Subcriber subcriber : subcribers){
            SubcriberDTO dto = new SubcriberDTO();
            dto.setId(subcriber.getId());
            dto.setEmail(subcriber.getEmail());
            dto.setFirstName(subcriber.getFirstName());
            dto.setLastName(subcriber.getLastName());
            dto.setTag(subcriber.getTag());
            dto.setType(subcriber.getType());
            dtos.add(dto);
        }
        return dtos;

    }

    @Override
    public boolean deleteSubcriberOutGroup(int subcriberId) {
        return false;
    }

    @Override
    public boolean deleteGroup(int groupId) {
        GroupContact groupContact = groupContactRepository.findGroupById(groupId);
        if(groupContact!= null){
            return false;
        }
        else{
            Long numberOfSubcribers = groupContactRepository.countTotalContactsByGroupId(groupId);

            if(numberOfSubcribers !=0){
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "This group contact can not delete!");
            }
        }
        try{
            groupContactRepository.deleteGroupContactById(groupId);

        }catch( DataAccessException ex){
            ex.printStackTrace();
            return false;
        }

        return true;



    }


    @Override
    public Long countTotalContactsByGroupId(int groupContactId ) {
        return groupContactRepository.countTotalContactsByGroupId(groupContactId);
    }
}
