package com.emailmkt.emailmarketing.repository;
import com.emailmkt.emailmarketing.model.FormGroupContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface EmbeddedGroupContactRepository extends JpaRepository<FormGroupContact,Integer> {




        @Transactional
        @Modifying(clearAutomatically = true)
        @Query("DELETE FROM FormGroupContact fr WHERE fr.embeddedForm.id  = :formId")
        void  deleteEmbeddedFormFromFormGroup(@Param("formId") int formId);

        @Modifying
        @Transactional
        @Query("DELETE from GroupContact gr where gr.id=:groupContactId")
        void deleteGroupContactById(@Param("groupContactId") int groupContactId);


//        @Query("SELECT gr.name " +
//                "FROM CampaignGroupContact com JOIN GroupContact gr ON com.groupContact.id = gr.id " +
//                "WHERE com.campaign.id  = :campaignId")
//        String[] findGroupByCampaignId(@Param("campaignId") int campaignId);




}
