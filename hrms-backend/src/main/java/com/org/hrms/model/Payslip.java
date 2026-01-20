package com.org.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Payslip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private LocalDate month; // e.g., 2023-10-01 for October
    private Double basicSalary;
    private Double allowances;
    private Double deductions;
    private Double netSalary;
    private String pdfUrl; // URL to stored PDF
}
