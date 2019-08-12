package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AppointmentSubcriberRepository extends JpaRepository<AppointmentSubcriber,Integer> {

    @Query("SELECT COUNT(ap.subcriberEmail) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId and ap.send=true ")
    Long countSubcriberInAppointment(@Param("appointmentId")int appointmentId);

    @Query("SELECT ap.subcriberEmail FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId and ap.send= true")
    List<String> findSubcriberMailByAppointmentId(@Param("appointmentId")int appointmentId);

    @Query("SELECT ap.confirmation FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail")
    public Boolean checkConfirmAppointment(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);


     @Query("select ap from AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail ")
     AppointmentSubcriber  changeConfirmSend(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);

    @Query("select ap from AppointmentSubcriber ap WHERE ap.messageId = :messageId ")
    List<AppointmentSubcriber>  findMessageId(@Param("messageId")String messageId);

     @Query("SELECT ap.send FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail")
    public Boolean checkSend(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);

     Double countAppointmentSubcriberBySubcriberEmail(String email);

    double countBySubcriberEmailAndOpened(String email, boolean open);

    double countBySubcriberEmailAndConfirmation(String email,boolean click);

    @Query("SELECT COUNT(u) FROM AppointmentSubcriber u WHERE u.appointmentGroupContact.appointment.id =:appointmentId")
    Double countRequest(@Param("appointmentId") int appointmentId);

    @Query("SELECT COUNT(ap) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id =:appointmentId and ap.delivery= true")
    Double countDelivery(@Param("appointmentId") int appointmentId);

    @Query("SELECT COUNT(ap) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id =:appointmentId and ap.opened= true")
    Double countOpen(@Param("appointmentId") int appointmentId);

    @Query("SELECT COUNT(ap) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id =:appointmentId and ap.confirmation= true")
    Double  countClick(@Param("appointmentId") int appointmentId);

    @Query("SELECT COUNT(ap) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id =:appointmentId and ap.spam= true")
    Double countSpam(@Param("appointmentId") int appointmentId);

    @Query("SELECT COUNT(ap) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id =:appointmentId and ap.bounce= true")
    Double countBounce(@Param("appointmentId") int appointmentId);
}
