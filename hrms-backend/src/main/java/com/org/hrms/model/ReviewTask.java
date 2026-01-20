package com.org.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Entity
@Table(name = "review_tasks")
@Data
public class ReviewTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;
    private Long managerId;

    @Enumerated(EnumType.STRING)
    private ViolationType violationType; // LOP, HALF_DAY

    @Enumerated(EnumType.STRING)
    private ApprovalStatus decision; // PENDING, APPROVED, REJECTED

    private String reason;
}
