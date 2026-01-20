package com.org.hrms.service;

import com.org.hrms.model.ProductivityRecord;
import com.org.hrms.model.ViolationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RuleEngineService {

    // Constant threshold for now, can be moved to DB/Config later
    private static final double MIN_PRODUCTIVITY_PERCENT = 70.0;

    private final LeaveService leaveService;

    public ViolationType evaluateViolation(ProductivityRecord record) {
        // 1. Check if on Approved Leave
        if (leaveService.isEmployeeOnLeave(record.getEmployeeId(), record.getWorkDate())) {
            return ViolationType.NONE; // No violation if on leave
        }

        double score = record.getProductivityPercent();

        if (score < 50.0) {
            return ViolationType.LOP;
        } else if (score < 70.0) {
            return ViolationType.HALF_DAY;
        }
        return ViolationType.NONE;
    }
}
