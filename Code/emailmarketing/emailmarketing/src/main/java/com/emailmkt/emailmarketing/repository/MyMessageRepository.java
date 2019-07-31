package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.MyMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface MyMessageRepository extends JpaRepository<MyMessage,Integer> {






}
