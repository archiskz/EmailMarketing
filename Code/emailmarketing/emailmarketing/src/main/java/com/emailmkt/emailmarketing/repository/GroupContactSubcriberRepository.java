package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.GroupContactSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface GroupContactSubcriberRepository extends JpaRepository<GroupContactSubcriber,Integer> {

        int countAllBySubcriberId(int id);

        GroupContactSubcriber findGroupContactSubcriberBySubcriberIdAndGroupContactId(int subcriberId,int groupContactId);
        @Transactional
        @Modifying(clearAutomatically = true)
        @Query("UPDATE GroupContactSubcriber gr SET gr.active =false WHERE gr.subcriber.id  = :subcriberId and gr.groupContact.id =:groupContactId")
        void  deleteSubcriberFromGroup(@Param("subcriberId") int subcriberId, @Param("groupContactId") int groupContactId);


        @Query("SELECT DISTINCT gr.subcriber FROM GroupContactSubcriber gr WHERE gr.active='1'")
        List<Subcriber> findAllSubcriberIsActive( );
//        @Query("SELECT gr.name " +
//                "FROM CampaignGroupContact com JOIN GroupContact gr ON com.groupContact.id = gr.id " +
//                "WHERE com.campaign.id  = :campaignId")
//        String[] findGroupByCampaignId(@Param("campaignId") int campaignId);




}
