package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.service.AccountService;
import com.emailmkt.emailmarketing.service.SubcriberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static javax.security.auth.callback.ConfirmationCallback.OK;
import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class SubcriberController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SubcriberController.class);
    @Autowired
    SubcriberService subcriberService;


    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }
    @GetMapping("/subcriber")
    public List<Subcriber> getAllSubcribers() {
        return subcriberService.getAllSubcribers();
    }

    @PostMapping("subcriber/create")
    public ResponseEntity createSubcriber(@RequestBody Subcriber subcriber) {
        boolean flag = subcriberService.createSubcrbier(subcriber);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Email đã tồn tại vui lòng thêm email khác");
        }
        return ResponseEntity.status(CREATED).body("Thêm thành công");

    }
    @GetMapping("subcriber/getSubcriberByTag")
    public List<Subcriber> getSubcriberByTag(@RequestParam(value = "tag") String tag) {
        return subcriberService.getSubcriberByTag(tag);
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
