package com.emailmkt.emailmarketing.service;

import com.emailmkt.emailmarketing.model.Account;

import java.util.List;


public interface AccountService {
    boolean createAccount(Account account);

    List<Account> getAllAccounts();

    Account editProfile(Account account);

    List<Account> getAllAccountsByCustomer();

    Account getAccountById(int id);

    Account loginForCustomer(String username, String password);

    List<Account> getAllAccountByRoleId(int roleId);

    Account updateAccount(Account account);

    int countTotalUserAccount(int roleId);

    Account createNewAccount(Account account);

    Account getAccountByUsername(String username);
}
