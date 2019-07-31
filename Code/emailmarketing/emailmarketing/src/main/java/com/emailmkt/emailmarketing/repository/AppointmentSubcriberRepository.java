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

    @Query("SELECT COUNT(ap.subcriberEmail) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId")
    Long countSubcriberInAppointment(@Param("appointmentId")int appointmentId);

    @Query("SELECT ap.subcriberEmail FROM AppointmentSubcriber ap WHERE 'appointment_id' = :appointmentId")
    List<String> findSubcriberMailByAppointmentId(@Param("appointmentId")int appointmentId);

    @Query("SELECT ap.confirmation FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail")
    int checkConfirmAppointment(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);

//    @Transactional
//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE AppointmentSubcriber ap SET ap.send = true WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId and ap.subcriberEmail =:subcriberEmail")
//    void  changeConfirmSend(@Param("appointmentId") int appointmentId, @Param("subcriberEmail") String subcriberEmail);

     @Query("select ap from AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail ")
     AppointmentSubcriber  changeConfirmSend(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);

     @Query("SELECT ap.send FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail")
    boolean checkSend(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);
}

