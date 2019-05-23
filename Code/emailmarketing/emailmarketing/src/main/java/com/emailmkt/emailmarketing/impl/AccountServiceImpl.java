package com.emailmkt.emailmarketing.impl;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.repository.AccountRepository;
import com.emailmkt.emailmarketing.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;
//    private final AccountRepository accountRepository;
//
//    public AccountServiceImpl(AccountRepository accountRepository) {
//        this.accountRepository = accountRepository;
//    }

    @Override
    public boolean createAccount(Account account) {
        System.out.println(account.getUsername());
        Account checkExistedAccount = accountRepository.findByUsername(account.getUsername());
        if (checkExistedAccount != null) {
            return false;
        }
        account.setCreatedTime(LocalDateTime.now().toString());
        account.setPassword(account.getPassword());
        accountRepository.save(account);
        return true;
    }

    @Override
    public List<Account> getAllAccounts() {
        System.out.println("toi day chưa hihihi");
        return accountRepository.findAll();
    }

    @Override
    public Account editProfile(Account account) {
        try {
            Account checkExistedAccount = accountRepository.findAccountById(account.getId());
            if (checkExistedAccount != null) {
                System.out.println("TEST");
                checkExistedAccount.setEmail(account.getEmail());
                checkExistedAccount.setPhone(account.getPhone());
                checkExistedAccount.setGender(account.getGender());
                checkExistedAccount.setAddress(account.getAddress());
                checkExistedAccount.setRoleId(account.getRoleId());
                checkExistedAccount.setUpdatedTime(LocalDateTime.now().toString());
                checkExistedAccount.setFullname(account.getFullname());

                return accountRepository.save(checkExistedAccount);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Account> getAllAccountsByCustomer() {
        return accountRepository.findAllByRoleIdGreaterThanEqual(2);
    }

    @Override
    public Account getAccountById(int id) {
        return accountRepository.findAccountById(id);
    }

    @Override
    public Account loginForCustomer(String username, String password) {
        return accountRepository.findAccountByUsernameAndPassword(username, password);
    }

    @Override
    public List<Account> getAllAccountByRoleId(int roleId) {
        return accountRepository.findAllByRoleIdOrderByCreatedTimeDesc(roleId);
    }

    @Override
    public Account updateAccount(Account account) {
        return null;
    }

    @Override
    public int countTotalUserAccount(int roleId) {
        return accountRepository.countAllByRoleId(roleId);
    }

    @Override
    public Account createNewAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountByUsername(String username) {
        return accountRepository.findByUsername(username);
    }
}
