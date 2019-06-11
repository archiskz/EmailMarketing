package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Group;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.GroupRepository;
import com.emailmkt.emailmarketing.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupRepository groupRepository;

    @Override
    public boolean createGroup(Group group) {
        System.out.println(group.getName());
        Group checkExistedGroup = groupRepository.findByName(group.getName());
        if (checkExistedGroup != null) {
            return false;
        }
        group.setCreatedTime(LocalDateTime.now().toString());
        group.setName(group.getName());
        group.setDescription(group.getDescription());
        groupRepository.save(group);
        return true;
    }

    @Override
    public List<Group> getAllGroup() {
        return groupRepository.findAll();
    }

    @Override
    public Group editGroup(Group group) {
        try {
            Group checkExistedGroup = groupRepository.findGroupById(group.getId());
            if (checkExistedGroup != null) {
                System.out.println("TEST");
                checkExistedGroup.setName(group.getName());
                checkExistedGroup.setDescription(group.getDescription());
                checkExistedGroup.setUpdatedTime(LocalDateTime.now().toString());

                return groupRepository.save(checkExistedGroup);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public Group getGroupByName(String name) {
        return groupRepository.findByName(name);
    }

    @Override
    public Group updateGroup(Group group) {
        return null;
    }

    @Override
    public int countTotalGroup(int groupId) {
        return groupRepository.countAllById(groupId);
    }

    @Override
    public Group createNewGroup(Group group) {
        return groupRepository.save(group);
    }

    @Override
    public List<Group> searchByName(String searchValue) {
        return groupRepository.searchByName(searchValue);
    }
}
