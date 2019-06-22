package com.emailmkt.emailmarketing.controller;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.service.AccountService;
import com.emailmkt.emailmarketing.service.AmazonSESSample;
import com.emailmkt.emailmarketing.service.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    AmazonSESSample amazonSESSample;

    @Autowired
    MailService mailService;


    //    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/accounts/testSendMail")
    public void sendTestEmail(){
        amazonSESSample.sendMail();
    }

    @GetMapping("/accounts/testSendMail2")
    public void sendTestEmail2(){
        mailService.sendSimpleMessage();
    }

    @PostMapping("sign-up")
    public ResponseEntity createAccount(@RequestBody Account account) {
        boolean flag = accountService.createAccount(account);
        if (flag == false) {
            return ResponseEntity.status(CONFLICT).body("Username của đã tồn tại, vui lòng chon username khác");
        }
        return ResponseEntity.status(CREATED).body("Đăng kí thành công");

    }
//    @GetMapping("customer/accounts")
//    public ResponseEntity<List<Account>> findAllAccountsByCustomer() {
//        List<Account> vms = accountService.getAllAccountsByCustomer();
//        return new ResponseEntity<List<Account>>(vms, HttpStatus.OK);
//    }

    @PutMapping("account/edit")
    public ResponseEntity updateProfile(@RequestBody Account account) {
        Account accountEdited = accountService.editProfile(account);
        if (accountEdited != null) {
            return ResponseEntity.status(OK).body(accountEdited);
        }
        return ResponseEntity.status(NOT_FOUND).body("Tài khoản này không tồn tại");
    }
    @GetMapping("account/{id}")
    public Account getAccount(@PathVariable(value = "id") int id) {
        return accountService.getAccountById(id);
    }
//
//    @GetMapping("accounts/allAccountByAuthorityId")
//    public List<Account> getAllAccountByAuthorityId(@RequestParam(value = "authorityId") int authorityId) {
//        return accountService.getAllAccountByauthorityId(authorityId);
//    }

    @PostMapping("/account/search/{searchValue}")
    public ResponseEntity<Page<Account>> searchAccount(@PathVariable(value = "searchValue") String searchValue,
                                                       @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
                                                       @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
                                                       @RequestParam(name = "size", required = false, defaultValue = "5") Integer size){
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(Account.PROP_USERNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(Account.PROP_USERNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<Account> vm = accountService.searchByUsernameOrFullname(pageable,searchValue);
        LOGGER.info("Search Account: " + vm.getTotalElements());
        return new ResponseEntity<Page<Account>>(vm, HttpStatus.OK);
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
