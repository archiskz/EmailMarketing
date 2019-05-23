package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static javax.security.auth.callback.ConfirmationCallback.OK;
import static org.springframework.http.HttpStatus.*;

@RestController
//@RequestMapping(AccountController.BASE_URK)
@RequestMapping("/api")
public class AccountController {
    public static final String BASE_URK = "account";
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);
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

    @PutMapping("edit")
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

    @GetMapping("getAllAccountByRoleId")
    public List<Account> getAllAccountByRoleId(@RequestParam(value = "roleId") int roleId) {
        return accountService.getAllAccountByRoleId(roleId);
    }


}
