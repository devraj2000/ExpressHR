package com.org.hrms.repository;

import com.org.hrms.model.LeaveRequest;
import com.org.hrms.model.ApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);

    // Find if employee is on approved leave for a specific date
    // (Simplification: Checking if start date matches for now, real logic needs
    // date range query)
    List<LeaveRequest> findByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Long employeeId, ApprovalStatus status, LocalDate date1, LocalDate date2);
}
