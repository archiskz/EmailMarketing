package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.repository.SubcriberRepository;
import com.emailmkt.emailmarketing.service.SubcriberService;
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

public class SubcriberController {
    private final SubcriberRepository subcriberRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(SubcriberController.class);
    @Autowired
    SubcriberService subcriberService;

    @Autowired
    public SubcriberController(SubcriberRepository subcriberRepository) {
        this.subcriberRepository = subcriberRepository;
    }


    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }
    @GetMapping("/subcribers")
    Iterable<Subcriber> getAll() {
        return subcriberRepository.findAll();
    }

    @GetMapping("/subcribersV2")
    public List<SubcriberDTO> getAllSubcriber() {
        return subcriberService.getAllSubcriberV2();
    }

    @GetMapping(value="subcriber/{id}")
    Subcriber read(@PathVariable int id) {
        return subcriberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    @PostMapping("subcriber/create")
    public ResponseEntity createSubcriber(@RequestBody SubcriberDTO dto) {
        boolean flag = subcriberService.createSubcrbier(dto);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email đã tồn tại vui lòng thêm email khác");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }
    @PostMapping("subcriber/createV2")
    public ResponseEntity createSubcriberNormal(@RequestBody SubcriberDTO dto) {
        boolean flag = subcriberService.createSubcriberNormal(dto);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email đã tồn tại vui lòng thêm email khác");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }

    @PostMapping("subcriber/createListSubcriber")
    public ResponseEntity createListSubcriber(@RequestBody List<SubcriberDTO> dtos) {
        boolean flag = subcriberService.createListSubcrbier(dtos);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email đã tồn tại vui lòng thêm email khác");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }

    @GetMapping("subcriber/getSubcriberByTag")
    public List<Subcriber> getSubcriberByTag(@RequestParam(value = "tag") String tag) {
        return subcriberService.getSubcriberByTag(tag);
    }
    @PutMapping("subcriber/edit/{id}")
    Subcriber update(@RequestBody Subcriber updatingSubcriber, @PathVariable int id) {
        return subcriberRepository.findById(id)
                .map(subcriber -> {
                    subcriber.setEmail(updatingSubcriber.getEmail());
                    subcriber.setFirstName(updatingSubcriber.getFirstName());
                    subcriber.setLastName(updatingSubcriber.getLastName());
                    subcriber.setUpdatedTime(LocalDateTime.now().toString());


                    return subcriberRepository.save(subcriber);
                })
                .orElseGet(() -> {
                    updatingSubcriber.setId(id);

                    return subcriberRepository.save(updatingSubcriber);
                });

    }
//
//    @PutMapping("account/edit")
//    public ResponseEntity updateProfile(@RequestBody Account account) {
//        Account accountEdited = accountService.editProfile(account);
//        if (accountEdited != null) {
//            return ResponseEntity.status(OK).body(accountEdited);
//        }
//        return ResponseEntity.status(NOT_FOUND).body("Tài khoản này không tồn tại");
//    }
//    @GetMapping("update/{id}")
//    public Account getAccount(@PathVariable(value = "id") int id) {
//        return accountService.getAccountById(id);
//    }
//
    @GetMapping("/subcriber/getAllSubcriberByAccountId")
    public List<Subcriber> getAllSubcriberByAccountId(@RequestParam(value = "account_id") int accountId) {
        return subcriberService.getSubcriberByAccountId(accountId);
    }

    @PostMapping("/subcriber/search/{searchValue}")
    public List<Subcriber> searchSubcriber(@PathVariable(value = "searchValue") String searchValue){
        return subcriberService.searchByNameorEmail(searchValue);
    }


//
//    @PostMapping("updateAccount")
//    public boolean updateAccount(@RequestBody Account account) {
//        Account accountUpdated = accountService.updateAccount(account);
//        if (accountUpdated == null) {
//            return false;
//        } else {
//            return true;
//        }
//    }
////


    }
