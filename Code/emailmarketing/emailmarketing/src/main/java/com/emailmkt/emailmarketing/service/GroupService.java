package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Group;

import java.util.List;

public interface GroupService {
    boolean createGroup(Group group);

    List<Group> getAllGroup();

    Group editGroup(Group group);

    Group getGroupByName(String name);

    Group updateGroup(Group subcriber);

    int countTotalGroup(int groupId);

    Group createNewGroup(Group group);

    List<Group> searchByName( String searchValue);

}
