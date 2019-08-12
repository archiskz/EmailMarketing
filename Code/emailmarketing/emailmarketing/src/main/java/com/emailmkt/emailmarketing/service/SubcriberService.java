package com.emailmkt.emailmarketing.service;


import com.emailmkt.emailmarketing.dto.StatisticContactDTO;
import com.emailmkt.emailmarketing.dto.SubcriberDTO;
import com.emailmkt.emailmarketing.dto.SubcriberFormDTO;
import com.emailmkt.emailmarketing.dto.SubcriberViewDTO;
import com.emailmkt.emailmarketing.model.Subcriber;

import java.util.List;

public interface SubcriberService {
    boolean createSubcrbier(SubcriberDTO dto);

    boolean createSubcriberForm(SubcriberFormDTO dto);

    boolean createListSubcrbier(List<SubcriberDTO> subcriberDTO);


    Subcriber editSubcriber(Subcriber subcriber);

    void getStatisticSubcriber();

    List<Subcriber>getContactLatest();


    List<Subcriber> getSubcriberByTag(String tag);

    SubcriberViewDTO getSubcriberById(int id);


    List<Subcriber> getSubcriberByAccountId(int accountId);

    Subcriber updateSubcriber(Subcriber subcriber);

    int countTotalSubcriber(int accountId);

    StatisticContactDTO countSubcriber();


    Subcriber getSubcriberByEmail(String email);

    List<Subcriber> searchByNameorEmail( String searchValue);

    List<SubcriberDTO>getAllSubcriberV2();

    String deleteSubcriber(int id,int groupId);


//    List<Account> getAllAccountsByCustomer();
//    Account loginForCustomer(String username, String password);
}
