package com.org.hrms.service;

import com.org.hrms.model.ProductivityRecord;
import com.org.hrms.repository.ProductivityRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductivityService {
    private static final Logger logger = LoggerFactory.getLogger(ProductivityService.class);

    private final ProductivityRepository productivityRepository;
    private final RuleEngineService ruleEngineService;
    private final ReviewWorkflowService reviewWorkflowService;

    public void processRecord(ProductivityRecord record) {
        ProductivityRecord savedRecord = productivityRepository.save(record);

        com.org.hrms.model.ViolationType violation = ruleEngineService.evaluateViolation(savedRecord);

        if (violation != com.org.hrms.model.ViolationType.NONE) {
            logger.info("Violation detected for employee {}: {}", savedRecord.getEmployeeId(), violation);

            // 1. Create Review Task
            reviewWorkflowService.createTask(savedRecord, violation);

            // 2. Mock: Fetch employee email (assuming we had it)
            // In real app, we would fetch Employee object here.
            // For now, passing a dummy or fetching if needed.

            // 3. Send Notification
            // We need to fetch the employee to get email
            // (Assuming we add getEmployeeById to service/repo access here, or just mock
            // for now)
            // For simplicity in this step, I'll log it via EmailService inside createTask
            // or here if I fetch employee.
        }
    }
}
