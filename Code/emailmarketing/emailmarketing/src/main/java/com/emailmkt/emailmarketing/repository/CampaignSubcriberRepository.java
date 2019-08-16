package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.CampaignSubcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
@Repository
@Transactional
public interface CampaignSubcriberRepository extends JpaRepository<CampaignSubcriber,Integer> {
//
//    @Query("SELECT COUNT(ap.subcriberEmail) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId")
//    Long countSubcriberInAppointment(@Param("appointmentId") int appointmentId);

    @Query("select ap from CampaignSubcriber ap WHERE ap.campaignGroupContact.campaign.id = :campaignId ")
    List<CampaignSubcriber>  findCampaignSubcriberByCampaignId(@Param("campaignId")int campaignId);



    @Modifying
    @Query("DELETE FROM CampaignSubcriber cb WHERE cb.id in ( SELECT cb2.id  FROM CampaignSubcriber cb2 WHERE cb2.campaignGroupContact.campaign.id = :campaignId)")
    void  clearCampaignSubcriber(@Param("campaignId") int campaignId);

    @Query("SELECT cp.subcriberEmail FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId and cp.send=true and cp.opened = :check ")
    List<String> findSubcriberMailByCampaignAndOpened(@Param("campaignId") int campaignId,@Param("check") boolean check);

    @Query("SELECT cp.subcriberEmail FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId and cp.send=true and cp.comfirmation = :check ")
    List<String> findSubcriberMailByCampaignAndClicked(@Param("campaignId") int campaignId,@Param("check") boolean check);

    @Query("SELECT cp.subcriberEmail FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId and cp.send=true ")
    List<String> findSubcriberMailByCampaignId(@Param("campaignId") int campaignId);
//
    @Query("SELECT cp.comfirmation FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail")
    Boolean checkConfirmCampaign(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);



     @Query("select cp from CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail ")
     CampaignSubcriber  changeConfirmSend(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);

     @Query("SELECT cp.send FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail")
    public Boolean checkSend(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);

    @Query("SELECT cp.opened FROM CampaignSubcriber cp WHERE cp.campaignGroupContact.campaign.id = :campaignId AND cp.subcriberEmail= :subcriberEmail")
    public Boolean checkOpen(@Param("campaignId") int campaignId, @Param("subcriberEmail") String subcriberEmail);


    @Query("select ap from CampaignSubcriber ap WHERE ap.messageId = :messageId ")
    List<CampaignSubcriber>  findMessageId(@Param("messageId")String messageId);

    @Query("SELECT COUNT(u) FROM CampaignSubcriber u WHERE u.campaignGroupContact.campaign.id =:campaignId")
    Double countRequest(@Param("campaignId") int campaignId);

    @Query("SELECT COUNT(cam) FROM CampaignSubcriber cam WHERE cam.campaignGroupContact.campaign.id =:campaignId and cam.delivery = true")
    Double countDelivery(@Param("campaignId") int campaignId);

    @Query("SELECT COUNT(cam) FROM CampaignSubcriber cam WHERE cam.campaignGroupContact.campaign.id =:campaignId and cam.opened = true")
    Double countOpen(@Param("campaignId") int campaignId);

    @Query("SELECT COUNT(cam) FROM CampaignSubcriber cam WHERE cam.campaignGroupContact.campaign.id =:campaignId and cam.comfirmation = true")
    Double  countClick(@Param("campaignId") int campaignId);

    @Query("SELECT COUNT(cam) FROM CampaignSubcriber cam WHERE cam.campaignGroupContact.campaign.id =:campaignId and cam.spam = true")
    Double countSpam(@Param("campaignId") int campaignId);

    @Query("SELECT COUNT(cam) FROM CampaignSubcriber cam WHERE cam.campaignGroupContact.campaign.id =:campaignId and cam.bounce = true")
    Double countBounce(@Param("campaignId") int campaignId);

    Double countCampaignSubcriberBySubcriberEmail(String email);

    Double countBySubcriberEmailAndComfirmation(String email, boolean click);
    Double countBySubcriberEmailAndOpened(String email, boolean open);

    int countAllBySubcriberEmail(String mail);

}

