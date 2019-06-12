package com.emailmkt.emailmarketing.controller;


import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.service.GroupContactService;

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
public class GroupContactController {
    private static final Logger LOGGER = LoggerFactory.getLogger(GroupContactController.class);

    @Autowired
    GroupContactService groupContactService;


    @GetMapping("/groupContacts")
    public List<GroupContact> getAllGroups() {
        return groupContactService.getAllGroupContacts();
    }

    @PostMapping("groupContact/create")
    public ResponseEntity createGroupContact(@RequestBody GroupContact groupContact) {
        boolean flag = groupContactService.createGroupContact(groupContact);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Group đã tồn tại tạo group mới");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }

    @PostMapping("/groupContact/search/{searchValue}")
    public List<GroupContact> searchGroupContact(@PathVariable(value = "searchValue") String searchValue){
        return groupContactService.searchByName(searchValue);
    }
    @GetMapping("/groupContact/count")
    public int countTotalGroup(int id) {
        return groupContactService.countTotalGroupContact(id);
    }




}
