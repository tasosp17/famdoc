package com.famdoc.famdoc_backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String areaCode;    
}
