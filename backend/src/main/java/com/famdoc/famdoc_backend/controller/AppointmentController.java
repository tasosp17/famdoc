package com.famdoc.famdoc_backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.famdoc.famdoc_backend.dto.AppointmentRequest;
import com.famdoc.famdoc_backend.model.*;
import com.famdoc.famdoc_backend.repository.*;


@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(AppointmentRepository appointmentRepository, UserRepository userRepository, DoctorRepository doctorRepository){
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
    }

    //get all appointments for a specific doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable Long doctorId){
        return appointmentRepository.findByDoctorIdAndDoctorDeletedFalse(doctorId);
    }

    //get all appointments for a specific user
    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        return appointmentRepository.findByUserIdAndUserDeletedFalse(userId);
    }

    //POST request appointment
    @PostMapping("/request")
    public Appointment requestAppointment(@RequestBody AppointmentRequest request){
        //fetch User item from DB
        User user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        //fetch Doctor item from DB
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));

        //build new appointment
        Appointment newAppointment = new Appointment();
        newAppointment.setUser(user);
        newAppointment.setDoctor(doctor);
        newAppointment.setAppointmentDate(request.getAppointmentDate());

        //every new request starts as pending
        newAppointment.setStatus(AppointmentStatus.PENDING);
        //set soft delete variables
        newAppointment.setUserDeleted(false);
        newAppointment.setDoctorDeleted(false);

        //save to db and return
        return appointmentRepository.save(newAppointment);
    }
    
    //accept/decline appointment
    @PutMapping("/{id}/status")
    public Appointment updateAppointmentStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(status);
        
        return appointmentRepository.save(appointment);
    }

    //deletions: soft check -> hard delete
    @PutMapping("/{id}/remove")
    public String removeAppointment(@PathVariable Long id, @RequestParam String role) {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Appointment not found"));

        //check who is requesting the deletion and flip their tag
        if ("user".equalsIgnoreCase(role)){
            appointment.setUserDeleted(true);
        }else if ("doctor".equalsIgnoreCase(role)){
            appointment.setDoctorDeleted(true);
        }else {
            throw new IllegalArgumentException("Invalid role parameter. Use 'user' or 'doctor'.");
        }

        //if both tags are true, delete appointment 
        if (appointment.isUserDeleted() && appointment.isDoctorDeleted()){
            appointmentRepository.delete(appointment);
            return "Appointment completely wiped from the system database.";
        }else {
            appointmentRepository.save(appointment);
            return "Appointment successfully removed from " + role + "'s view.";
        }
        
    }
}
