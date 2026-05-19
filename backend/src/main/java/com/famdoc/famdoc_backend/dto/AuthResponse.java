package com.famdoc.famdoc_backend.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Long id;
    private String role;

    public AuthResponse(String token, Long id, String role){
        this.token = token;
        this.id = id;
        this.role = role;
    }
}
