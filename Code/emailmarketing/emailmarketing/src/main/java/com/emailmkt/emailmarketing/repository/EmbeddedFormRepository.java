package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.EmbeddedForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmbeddedFormRepository extends JpaRepository<EmbeddedForm,Integer> {
        EmbeddedForm findEmbeddedFormByName(String name);
        EmbeddedForm findEmbeddedFormById(int id);






}
