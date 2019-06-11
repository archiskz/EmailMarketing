package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Account;
import com.emailmkt.emailmarketing.model.Subcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcriberRepository extends JpaRepository<Subcriber, Integer> {
     Subcriber findByEmail(String email);

//    List<Account> findAllByauthorityIdGreaterThanEqual(int authority_id);
//
//
//
     @Query("SELECT su FROM Subcriber su WHERE " +
             "(LOWER(su.name) like %:searchValue% or su.email like %:searchValue%) " )
     List<Subcriber> searchByEmailAndName(@Param("searchValue") String searchValue);

     Subcriber findSubcriberById(Integer id);
     List<Subcriber>findSubcriberByAccount_id(Integer id);
     List<Subcriber>findSubcriberByTag(String tag);
     Subcriber findSubcriberByEmail(String Email);
//
//    Account findAccountByUsernameAndPassword(String username, String password);
//
//    List<Account> findAllByauthorityIdOrderByCreatedTimeDesc(int authorityId);
    int countAllById(int subcriberId);


}
