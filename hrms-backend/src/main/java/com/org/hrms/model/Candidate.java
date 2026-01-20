package com.org.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String resumeUrl; // Resume Link

    // Job Link
    private Long jobId;
    private String applicationStatus; // APPLIED, SHORTLISTED, REJECTED, HIRED

    // Exam Status
    private String examStatus; // PENDING, PASSED, FAILED
    private int examScore;
    private Long assignedExamId;

    // Interview Status
    private String interviewStatus; // PENDING, SCHEDULED, CLEARED, REJECTED

    // BGV Status (Pre-onboarding)
    private String bgvStatus; // PENDING, CLEARED, FAILED, OFFER_GENERATED
}
