package com.org.hrms.repository;

import com.org.hrms.model.BackgroundVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BackgroundVerificationRepository extends JpaRepository<BackgroundVerification, Long> {
    Optional<BackgroundVerification> findByEmployeeId(Long employeeId);

    Optional<BackgroundVerification> findByCandidateId(Long candidateId);
}
