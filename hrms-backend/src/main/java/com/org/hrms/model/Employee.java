package com.org.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String role; // EMPLOYEE, MANAGER, HR
    private String department;
    private Long managerId;

    // Personal & Bank Details
    private String bankName;
    private String accountNumber;
    private String ifscCode;
    private String adhaarNumber;
    private String panNumber;
}
