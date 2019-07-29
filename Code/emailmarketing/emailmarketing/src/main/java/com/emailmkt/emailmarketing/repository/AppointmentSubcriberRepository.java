package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AppointmentSubcriberRepository extends JpaRepository<AppointmentSubcriber,Integer> {

    @Query("SELECT COUNT(ap.subcriberEmail) FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id  = :appointmentId")
    Long countSubcriberInAppointment(@Param("appointmentId")int appointmentId);
}
