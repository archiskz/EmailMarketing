package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Appointment;
import com.emailmkt.emailmarketing.model.AppointmentSubcriber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
        Appointment findByName(String name);
        Appointment findByToken(String token);
        Appointment findAppointmentById(int id);

        @Query("SELECT ap FROM AppointmentSubcriber ap WHERE ap.appointmentGroupContact.appointment.id = :appointmentId AND ap.subcriberEmail= :subcriberEmail")
        AppointmentSubcriber findMailByAppointmentId(@Param("appointmentId")int appointmentId,@Param("subcriberEmail")String subcriberEmail);






}
