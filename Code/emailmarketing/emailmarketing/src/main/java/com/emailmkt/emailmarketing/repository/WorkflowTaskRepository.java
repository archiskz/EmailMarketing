package com.emailmkt.emailmarketing.repository;
import com.emailmkt.emailmarketing.model.Campaign;
import com.emailmkt.emailmarketing.model.CampaignGroupContact;
import com.emailmkt.emailmarketing.model.WorkflowTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface WorkflowTaskRepository extends JpaRepository<WorkflowTask,Integer> {


        @Query("SELECT com.workflow FROM WorkflowTask com WHERE com.workflow.id  = :workflowId")
        List<Campaign> findByWorkflowTaskWorkflowId(@Param("workflowId") int workflowId);

        @Transactional
        @Modifying(clearAutomatically = true)
        @Query("DELETE FROM WorkflowTask com WHERE com.workflow.id  = :workflowId")
        void  deleteCampaignFromCampaginGroup(@Param("workflowId") int workflowId);


//        @Query("SELECT gr.name " +
//                "FROM CampaignGroupContact com JOIN GroupContact gr ON com.groupContact.id = gr.id " +
//                "WHERE com.campaign.id  = :campaignId")
//        String[] findGroupByCampaignId(@Param("campaignId") int campaignId);




}
