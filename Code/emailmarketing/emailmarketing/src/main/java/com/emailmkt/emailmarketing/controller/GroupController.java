package com.emailmkt.emailmarketing.controller;


import com.emailmkt.emailmarketing.model.Group;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.service.GroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class GroupController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SubcriberController.class);

    @Autowired
    GroupService groupService;


    @GetMapping("/groups")
    public List<Group> getAllGroups() {
        return groupService.getAllGroup();
    }

    @PostMapping("group/create")
    public ResponseEntity createGroup(@RequestBody Group group) {
        boolean flag = groupService.createGroup(group);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Group đã tồn tại tạo group mới");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }

    @PostMapping("/group/search/{searchValue}")
    public List<Group> searchGroup(@PathVariable(value = "searchValue") String searchValue){
        return groupService.searchByName(searchValue);
    }
    @GetMapping("/group/count")
    public int countTotalGroup(int id) {
        return groupService.countTotalGroup(id);
    }




}
