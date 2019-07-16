package com.emailmkt.emailmarketing.controller;


import com.emailmkt.emailmarketing.dto.GroupContactDTO;
import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.repository.GroupContactRepository;
import com.emailmkt.emailmarketing.service.GroupContactService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://45.77.172.104:3000"})
public class GroupContactController {
    private static final Logger LOGGER = LoggerFactory.getLogger(GroupContactController.class);

    @Autowired
    GroupContactService groupContactService;

    @Autowired
    GroupContactRepository groupContactRepository;



    @GetMapping("/groupContacts")
    public List<GroupContact> getAllGroups() {
        return groupContactService.getAllGroupContacts();
    }

    @GetMapping("/groupContact/contactById")
    public GroupContact getGroupById(@RequestParam(value = "id") int id) {
        return groupContactService.getGroupById(id);
    }

    @GetMapping("/groupContacts/subcribers")
    public List<GroupContactSubcriber> getAllSubcribers() {
        return groupContactService.getAllSubcriber();
    }

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid  ID"),
            @ApiResponse(code = 500, message = "Internal server error"),
            @ApiResponse(code = 409, message = "Existed Group"),
    })
    @PostMapping("/groupContact/create")
    public ResponseEntity createGroupContact(@RequestBody GroupContactDTO groupContactDTO) {
        boolean flag = groupContactService.createGroupContact(groupContactDTO);
        if (flag == false) {

            return ResponseEntity.status(CONFLICT).body("Group Existed");

        }
        return ResponseEntity.status(CREATED).body("Successfully");

    }

    @PostMapping("/groupContact/search/{searchValue}")
    public List<GroupContact> searchGroupContact(@PathVariable(value = "searchValue") String searchValue){
        return groupContactService.searchByName(searchValue);
    }
    @GetMapping("/groupContact/count")
    public Long countTotalGroup() {
        return groupContactService.countTotalGroupContacts();
    }

    @GetMapping("/groupContact/countContact/{id}")
    public Long countTotalContactsByGroupId(@PathVariable(value = "id") int id) {
        return groupContactService.countTotalContactsByGroupId(id);
    }
    @GetMapping("/groupContact={id}/contacts")
    public List<SubcriberDTO> findSubcriberByGroupContactId(@PathVariable(value = "id") int id) {
        System.out.println("Tới đây chưa ?");
        return groupContactService.findSubcriberByGroupContactId(id);
    }

    @PutMapping("/groupcontact/edit/{id}")
    GroupContact update(@RequestBody GroupContact updatingGroupContact, @PathVariable int id) {
        return groupContactRepository.findById(id)
                .map(groupContact -> {
                    groupContact.setDescription(updatingGroupContact.getDescription());
                    groupContact.setName(updatingGroupContact.getName());
                    groupContact.setUpdatedTime(LocalDateTime.now().toString());


                    return groupContactRepository.save(groupContact);
                })
                .orElseGet(() -> {
                    updatingGroupContact.setId(id);

                    return groupContactRepository.save(updatingGroupContact);
                });

    }







}
