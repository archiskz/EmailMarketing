package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {

    Authority findById(int id);
}
