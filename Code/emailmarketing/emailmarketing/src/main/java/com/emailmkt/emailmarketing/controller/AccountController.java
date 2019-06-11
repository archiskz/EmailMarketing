package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Subcriber;
import com.emailmkt.emailmarketing.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static javax.security.auth.callback.ConfirmationCallback.OK;
import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class AccountController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);
//    private final AuthenticationManager authenticationManager;




    @Autowired
     AccountService accountService;


    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping("sign-up")
    public ResponseEntity createAccount(@RequestBody Account account) {
        boolean flag = accountService.createAccount(account);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Username của đã tồn tại, vui lòng chon username khác");
        }
        return ResponseEntity.status(CREATED).body("Đăng kí thành công");

    }
    @GetMapping("customer/accounts")
    public List<Account> findAllAccountsByCustomer() {
        return accountService.getAllAccountsByCustomer();
    }

    @PutMapping("account/edit")
    public ResponseEntity updateProfile(@RequestBody Account account) {
        Account accountEdited = accountService.editProfile(account);
        if (accountEdited != null) {
            return ResponseEntity.status(OK).body(accountEdited);
        }
        return ResponseEntity.status(NOT_FOUND).body("Tài khoản này không tồn tại");
    }
    @GetMapping("update/{id}")
    public Account getAccount(@PathVariable(value = "id") int id) {
        return accountService.getAccountById(id);
    }

    @GetMapping("getAllAccountByAuthorityId")
    public List<Account> getAllAccountByAuthorityId(@RequestParam(value = "authorityId") int authorityId) {
        return accountService.getAllAccountByauthorityId(authorityId);
    }

    @PostMapping("/account/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue){

        return accountService.searchByUsernameOrFullname(searchValue); //này request param đúng ko hay chỉ param thôi?
    }



    @PostMapping("updateAccount")
    public boolean updateAccount(@RequestBody Account account) {
        Account accountUpdated = accountService.updateAccount(account);
        if (accountUpdated == null) {
            return false;
        } else {
            return true;
        }
    }
//


    }
