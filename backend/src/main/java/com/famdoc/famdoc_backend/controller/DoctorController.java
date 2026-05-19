package com.famdoc.famdoc_backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.famdoc.famdoc_backend.model.*;
import com.famdoc.famdoc_backend.service.DoctorService;
import com.famdoc.famdoc_backend.repository.*;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
    
    private final DoctorService doctorService;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public DoctorController(DoctorService doctorService, DoctorRepository doctorRepository,UserRepository userRepository){
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String zipCode) {
        return doctorService.getDoctorsByZip(zipCode);
    }

    @GetMapping("/recommended")
    public List<Doctor> getRecommended(@RequestParam Long id){
        //find user in db
        User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

        //use the user's area code to find doctors
        return doctorService.getDoctorsByZip(user.getAreaCode());
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id){
        return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
    
}
