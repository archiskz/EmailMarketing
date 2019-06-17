package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.GroupContact;
import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupContactRepository extends JpaRepository<GroupContact, Integer> {
    GroupContact findByName(String name);
    GroupContact findGroupById(int id);

    @Query("SELECT COUNT(gr) FROM GroupContact gr ")
    Long countTotalGroupContacts();

    @Query("SELECT gr FROM GroupContact gr WHERE " +
            "(LOWER(gr.name) like %:searchValue% ) " )
    List<GroupContact> searchByName(@Param("searchValue") String searchValue);

    @Query("SELECT gr FROM GroupContactSubcriber gr " )
    List<GroupContactSubcriber> getAllSubcriber();


    @Query("SELECT gr.subcriber FROM GroupContactSubcriber gr WHERE gr.groupContact.id = :groupContactId")
    List<Subcriber> findSubcriberByGroupContactId(@Param("groupContactId")int groupContactId);


    @Query("SELECT COUNT(gr.subcriber.id) FROM GroupContactSubcriber gr WHERE gr.groupContact.id  = :groupContactId")
    Long countTotalContactsByGroupId(@Param("groupContactId")int groupContactId);




}

