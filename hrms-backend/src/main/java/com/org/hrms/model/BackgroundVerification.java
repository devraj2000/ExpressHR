package com.org.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class BackgroundVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId; // Nullable if pre-onboarding
    private Long candidateId; // Linked to Candidate if pre-onboarding

    // PENDING, CLEARED, FAILED, OFFER_GENERATED
    private String status;

    private String provider; // e.g., "FirstAdvantage", "KPMG"
    private String remarks;

    // Document URLs
    private String resumeUrl;
    private String adhaarUrl;
    private String panUrl;
    private String drivingLicenseUrl;
    private String relievingLetterUrl;

    private LocalDate initiatedDate;
    private LocalDate completionDate;
}
