package com.famdoc.famdoc_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctors")
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String specialty;
    
    @Column(nullable = false)
    private String zipCode;
    
    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int maxPatients;
    
    @Column(nullable = false)
    private int currentPatientCount;

    public boolean isAvailable(){
        return currentPatientCount < maxPatients;
    }
}
