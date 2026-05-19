package com.famdoc.famdoc_backend.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AppointmentRequest {
    private Long userId;
    private Long doctorId;
    private LocalDateTime appointmentDate;
}
