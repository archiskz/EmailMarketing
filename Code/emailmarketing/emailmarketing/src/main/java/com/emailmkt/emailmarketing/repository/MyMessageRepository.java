package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.MyMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface MyMessageRepository extends JpaRepository<MyMessage,Integer> {

    @Query("SELECT mes.content FROM MyMessage mes WHERE mes.id = :id")
    String findContentByMessageId(@Param("id")int id);





}
