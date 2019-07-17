package com.emailmkt.emailmarketing.repository;

import com.emailmkt.emailmarketing.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
        Appointment findByName(String name);
        Appointment findByToken(String token);






}
