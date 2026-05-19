package com.famdoc.famdoc_backend.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.famdoc.famdoc_backend.security.JwtUtil;
import com.famdoc.famdoc_backend.dto.AuthResponse;
import com.famdoc.famdoc_backend.dto.LoginRequest;
import com.famdoc.famdoc_backend.dto.RegisterRequest;
import com.famdoc.famdoc_backend.model.Doctor;
import com.famdoc.famdoc_backend.model.User;
import com.famdoc.famdoc_backend.repository.DoctorRepository;
import com.famdoc.famdoc_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, DoctorRepository doctorRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    //register new patient
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request){
        //check if username is taken
        if (userRepository.findByUsername(request.getUsername()).isPresent() ||
        doctorRepository.findByUsername(request.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setAreaCode(request.getAreaCode());
        //hash password before saving
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    //universal login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request){
        //A: is it a user?
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isPresent()){
            User user = userOpt.get();
            //check if the typed password matches the BCrypt hash in the db
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())){
                String token = jwtUtil.generateToken(user.getUsername(), user.getId(), "user");
                return ResponseEntity.ok(new AuthResponse(token, user.getId(), "user"));
            }
        }
        //B: is it a doctor?
        Optional<Doctor> doctorOpt = doctorRepository.findByUsername(request.getUsername());
        if(doctorOpt.isPresent()){
            Doctor doctor = doctorOpt.get();
            if(passwordEncoder.matches(request.getPassword(), doctor.getPassword())){
                String token = jwtUtil.generateToken(doctor.getUsername(), doctor.getId(), "doctor");
                return ResponseEntity.ok(new AuthResponse(token, doctor.getId(), "doctor"));
            }
        }
        //C: invalid credentials
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }

    // Remove this before you go to production!
    @GetMapping("/hash")
    public String generateHash(@RequestParam String password) {
        return passwordEncoder.encode(password);
    }
}
