package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import com.emailmkt.emailmarketing.model.CampaignSubcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CampaignSubcriberRepository extends JpaRepository<CampaignSubcriber,Integer> {
//
//    @Query("SELECT COUNT(ap.subcriberEmail) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId")
//    Long countSubcriberInAppointment(@Param("appointmentId") int appointmentId);

    @Query("SELECT cp.subcriberEmail FROM CampaignSubcriber cp WHERE 'campaign_id' = :campaignId")
    List<String> findSubcriberMailByCampaignId(@Param("campaignId") int campaignId);
//
    @Query("SELECT cp.confirmation FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail")
    int checkConfirmCampaign(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);

     @Query("select cp from CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail ")
     CampaignSubcriber  changeConfirmSend(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);

     @Query("SELECT cp.send FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail")
    int checkSend(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);



}

