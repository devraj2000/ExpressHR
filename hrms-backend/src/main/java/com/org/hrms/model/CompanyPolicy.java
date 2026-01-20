package com.org.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CompanyPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(columnDefinition = "TEXT")
    private String content; // Or URL if it's a PDF
    private String category; // e.g., "Leave", "Conduct", "Benefits"
}
