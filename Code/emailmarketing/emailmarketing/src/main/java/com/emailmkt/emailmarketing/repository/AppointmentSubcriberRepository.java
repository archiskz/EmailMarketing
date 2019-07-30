package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import com.emailmkt.emailmarketing.model.Subcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
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
}
