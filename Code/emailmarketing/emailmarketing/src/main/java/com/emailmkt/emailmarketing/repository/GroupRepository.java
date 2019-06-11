package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Group;
import com.emailmkt.emailmarketing.model.Subcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
    Group findByName(String name);
    Group findGroupById(int id);

    int countAllById(int id);

    @Query("SELECT gr FROM Group gr WHERE " +
            "(LOWER(gr.name) like %:searchValue% ) " )
    List<Group> searchByName(@Param("searchValue") String searchValue);




}

