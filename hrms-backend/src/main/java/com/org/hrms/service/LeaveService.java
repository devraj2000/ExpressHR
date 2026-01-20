package com.org.hrms.service;

import com.org.hrms.model.*;
import com.org.hrms.repository.LeaveBalanceRepository;
import com.org.hrms.repository.LeaveRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaveService {
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveRequest applyLeave(Long employeeId, LeaveType type, LocalDate start, LocalDate end, String reason,
            boolean isHalfDay) {
        LeaveRequest request = new LeaveRequest();
        request.setEmployeeId(employeeId);
        request.setLeaveType(type);
        request.setStartDate(start);
        request.setEndDate(end);
        request.setReason(reason);
        request.setHalfDay(isHalfDay);
        request.setStatus(ApprovalStatus.PENDING);

        return leaveRequestRepository.save(request);
    }

    public LeaveRequest approveLeave(Long requestId) {
        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));

        if (request.getStatus() != ApprovalStatus.PENDING) {
            throw new RuntimeException("Leave Request is not PENDING");
        }

        // Deduct balance logic
        LeaveBalance balance = leaveBalanceRepository.findById(request.getEmployeeId())
                .orElse(new LeaveBalance(request.getEmployeeId(), 12, 12)); // Default

        double daysToDeduct = calculateDays(request.getStartDate(), request.getEndDate());
        if (request.isHalfDay()) {
            daysToDeduct = 0.5;
        }

        if (request.getLeaveType() == LeaveType.CL) {
            if (balance.getClBalance() >= daysToDeduct) {
                balance.setClBalance(balance.getClBalance() - daysToDeduct);
            } else {
                throw new RuntimeException("Insufficient CL Balance");
            }
        } else if (request.getLeaveType() == LeaveType.SL) {
            if (balance.getSlBalance() >= daysToDeduct) {
                balance.setSlBalance(balance.getSlBalance() - daysToDeduct);
            } else {
                throw new RuntimeException("Insufficient SL Balance");
            }
        }

        leaveBalanceRepository.save(balance);
        request.setStatus(ApprovalStatus.APPROVED);
        return leaveRequestRepository.save(request);
    }

    public LeaveRequest cancelLeave(Long requestId) {
        LeaveRequest request = leaveRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));

        if (request.getStatus() == ApprovalStatus.PENDING) {
            request.setStatus(ApprovalStatus.CANCELLED);
            return leaveRequestRepository.save(request);
        } else {
            throw new RuntimeException("Cannot cancel leave that is already processed");
        }
    }

    private double calculateDays(LocalDate start, LocalDate end) {
        // Simple day difference + 1. In real app, exclude weekends/holidays.
        return java.time.temporal.ChronoUnit.DAYS.between(start, end) + 1;
    }

    public boolean isEmployeeOnLeave(Long employeeId, LocalDate date) {
        List<LeaveRequest> leaves = leaveRequestRepository
                .findByEmployeeIdAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                        employeeId, ApprovalStatus.APPROVED, date, date);
        return !leaves.isEmpty();
    }
}
