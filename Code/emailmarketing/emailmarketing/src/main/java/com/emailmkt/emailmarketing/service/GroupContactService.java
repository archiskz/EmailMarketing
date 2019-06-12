package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.GroupContact;

import java.util.List;

public interface GroupContactService {
    boolean createGroupContact(GroupContact GroupContact);

    List<GroupContact> getAllGroupContacts();

    GroupContact editGroupContact(GroupContact GroupContact);

    GroupContact getGroupContactByName(String name);

    GroupContact updateGroupContact(GroupContact subcriber);

    int countTotalGroupContact(int GroupContactId);

    GroupContact createNewGroupContact(GroupContact GroupContact);

    List<GroupContact> searchByName( String searchValue);

}
