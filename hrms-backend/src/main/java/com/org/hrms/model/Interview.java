package com.org.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;
    private Long candidateId; // Link to Candidate Entity

    private String position; // e.g., "Java Developer"
    private LocalDateTime scheduledTime;
    private String interviewerName;
    private String meetingLink;
    private String feedback;
    private String status; // SCHEDULED, COMPLETED, NO_SHOW
}
