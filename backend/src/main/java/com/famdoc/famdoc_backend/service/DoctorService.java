package com.famdoc.famdoc_backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.famdoc.famdoc_backend.model.Doctor;
import com.famdoc.famdoc_backend.model.User;
import com.famdoc.famdoc_backend.repository.DoctorRepository;

@Service
public class DoctorService {
    
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getDoctorsByZip(String zip){
        return doctorRepository.findByZipCode(zip);
    }

    public List<Doctor> getRecommendedDoctors(User user){
        String userArea = user.getAreaCode();
        //reuse existing zip code search logic
        return getDoctorsByZip(userArea);
    }
}
