package com.org.hrms.repository;

import com.org.hrms.model.ApprovalStatus;
import com.org.hrms.model.ReviewTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewTaskRepository extends JpaRepository<ReviewTask, Long> {
    List<ReviewTask> findByManagerIdAndDecision(Long managerId, ApprovalStatus decision);

    List<ReviewTask> findByEmployeeId(Long employeeId);
}
