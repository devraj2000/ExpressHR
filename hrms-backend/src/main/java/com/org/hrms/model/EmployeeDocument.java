package com.org.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EmployeeDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private String documentType; // e.g., "AADHAAR", "PAN", "RESUME"
    private String documentUrl;
}
