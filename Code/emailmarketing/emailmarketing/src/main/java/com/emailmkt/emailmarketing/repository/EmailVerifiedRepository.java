package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.EmailVerified;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailVerifiedRepository extends JpaRepository<EmailVerified, Integer> {

    @Query("SELECT DISTINCT em.email FROM EmailVerified em WHERE em.account_id =:accountId")
    List<String> findEmailVerifiedBy(@Param("accountId") int accountId);

    @Query("SELECT DISTINCT em FROM EmailVerified em WHERE em.account_id =:accountId")
    List<EmailVerified>findDistinct(@Param("accountId") int accountId);

    EmailVerified findEmailVerifiedByEmailAndAccount_id(String email, int accountId);



}
