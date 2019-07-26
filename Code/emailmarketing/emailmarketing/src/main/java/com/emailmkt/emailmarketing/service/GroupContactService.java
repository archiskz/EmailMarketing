package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.dto.GroupContactDTO;
import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;

import java.util.List;

public interface GroupContactService {
    boolean createGroupContact(GroupContactDTO groupContactDTO);

    List<GroupContact> getAllGroupContacts();

    GroupContact editGroupContact(GroupContact GroupContact);



    GroupContact getGroupContactByName(String name);
    GroupContact getGroupById(int id);

    GroupContact updateGroupContact(GroupContact subcriber);

    Long countTotalGroupContacts();

    GroupContact createNewGroupContact(GroupContact GroupContact);

    List<GroupContact> searchByName( String searchValue);
//
    Long countTotalContactsByGroupId(int groupContactId);
    List<GroupContactSubcriber> getAllSubcriber();
    List<SubcriberDTO> findSubcriberByGroupContactId(int groupContactId);

    boolean deleteSubcriberOutGroup(int subcriberId);





}
