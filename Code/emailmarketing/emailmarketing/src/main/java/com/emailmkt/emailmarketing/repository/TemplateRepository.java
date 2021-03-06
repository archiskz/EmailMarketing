package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Integer> {

    List<Template> findByType (java.lang.String type);
//    Template findById(int id);

    Template findTemplateById(int id);

    List<Template> findAll();

//    @Query("SELECT tem FROM Template tem WHERE " +
//            "(LOWER(tem.name) like %:searchValue%) " )
//    List<Template> searchByNameorType(@Param("searchValue") String searchValue);
    Template findByNameTemplate(java.lang.String nameTemplate);
}