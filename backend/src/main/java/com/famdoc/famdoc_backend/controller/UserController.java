package com.famdoc.famdoc_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.famdoc.famdoc_backend.model.User;
import com.famdoc.famdoc_backend.repository.UserRepository;

@RestController
@RequestMapping("/api/{id}")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public User getUserProfile(@PathVariable Long id){
        return userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
