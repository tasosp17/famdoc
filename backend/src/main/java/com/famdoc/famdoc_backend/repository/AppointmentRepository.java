package com.famdoc.famdoc_backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.famdoc.famdoc_backend.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorIdAndDoctorDeletedFalse(Long doctorId);

    List<Appointment> findByUserIdAndUserDeletedFalse(Long userId);
}
