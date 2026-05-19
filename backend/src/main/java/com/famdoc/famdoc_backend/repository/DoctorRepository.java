package com.famdoc.famdoc_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.famdoc.famdoc_backend.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{
    //create search query automatically based on method name
    List<Doctor> findByZipCode(String zipCode);

    Optional<Doctor> findByUsername(String username);
}
