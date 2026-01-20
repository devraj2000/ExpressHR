package com.org.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime timestamp;
    private String actor; // "SYSTEM" or "Manager ID: X"
    private String action; // "REVIEW_CREATED", "DECISION_MADE"
    private String details;

    // Auto-set timestamp
    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }
}
