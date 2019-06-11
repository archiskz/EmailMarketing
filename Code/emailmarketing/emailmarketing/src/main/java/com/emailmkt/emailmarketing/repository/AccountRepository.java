package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByUsername(String username);

    List<Account> findAllByauthorityIdGreaterThanEqual(int authority_id);


    Account findAccountById(Integer id);

    @Query("SELECT a FROM Account a WHERE " +
            "(LOWER(a.fullname) like %:searchValue% or a.username like %:searchValue%) " +
            "and a.authorityId = 1")
    List<Account> searchByUsernameOrFullname(@Param("searchValue") String searchValue);

    Account findAccountByUsernameAndPassword(String username, String password);

    List<Account> findAllByauthorityIdOrderByCreatedTimeDesc(int authorityId);

    int countAllByauthorityId(int authorityId);


}
