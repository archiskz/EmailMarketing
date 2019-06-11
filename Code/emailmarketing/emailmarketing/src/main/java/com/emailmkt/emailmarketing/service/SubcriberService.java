package com.emailmkt.emailmarketing.service;


import com.emailmkt.emailmarketing.model.Subcriber;

import java.util.List;

public interface SubcriberService {
    boolean createSubcrbier(Subcriber subcriber);

    List<Subcriber> getAllSubcribers();

    Subcriber editSubcriber(Subcriber subcriber);

    List<Subcriber> getSubcriberByTag(String tag);

    Subcriber getSubcriberById(int id);


    List<Subcriber> getSubcriberByAccountId(int accountId);

    Subcriber updateSubcriber(Subcriber subcriber);

    int countTotalSubcriber(int accountId);

    Subcriber createNewSubcriber(Subcriber subcriber);

    Subcriber getSubcriberByEmail(String email);

    List<Subcriber> searchByNameorEmail( String searchValue);
//    List<Account> getAllAccountsByCustomer();
//    Account loginForCustomer(String username, String password);
}
