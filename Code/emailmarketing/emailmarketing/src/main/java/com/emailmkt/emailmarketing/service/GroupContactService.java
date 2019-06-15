package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;

import java.util.List;

public interface GroupContactService {
    boolean createGroupContact(GroupContact GroupContact);

    List<GroupContact> getAllGroupContacts();

    GroupContact editGroupContact(GroupContact GroupContact);

    GroupContact getGroupContactByName(String name);
    GroupContact getGroupById(int id);

    GroupContact updateGroupContact(GroupContact subcriber);

    Long countTotalGroupContacts();

    GroupContact createNewGroupContact(GroupContact GroupContact);

    List<GroupContact> searchByName( String searchValue);
//
//    List<Subcriber> findSubcriberByGroupContactId(int groupContactId);
    Long countTotalContactsByGroupId(int groupContactId);
    List<GroupContactSubcriber> getAllSubcriber();
    List<Subcriber> findSubcriberByGroupContactId(int groupContactId);



}
