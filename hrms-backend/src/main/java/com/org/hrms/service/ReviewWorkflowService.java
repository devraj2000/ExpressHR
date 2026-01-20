package com.org.hrms.service;

import com.org.hrms.model.ApprovalStatus;
import com.org.hrms.model.Employee;
import com.org.hrms.model.ProductivityRecord;
import com.org.hrms.model.ReviewTask;
import com.org.hrms.repository.EmployeeRepository;
import com.org.hrms.repository.ReviewTaskRepository;
import com.org.hrms.model.AuditLog;
import com.org.hrms.model.ViolationType;
import com.org.hrms.repository.AuditLogRepository;
import com.org.hrms.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewWorkflowService {
    private final ReviewTaskRepository reviewTaskRepository;
    private final EmployeeRepository employeeRepository;

    private final AuditLogRepository auditLogRepository;
    private final EmailService emailService;

    public ReviewTask createTask(ProductivityRecord record, ViolationType violationType) {
        Employee employee = employeeRepository.findById(record.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Trigger Email Alert
        emailService.sendViolationAlert(employee, violationType);
        emailService.sendManagerActionRequired(employee.getManagerId(), employee, violationType);

        ReviewTask task = new ReviewTask();
        task.setEmployeeId(record.getEmployeeId());
        task.setManagerId(employee.getManagerId());
        task.setDecision(ApprovalStatus.PENDING);
        task.setViolationType(violationType);

        ReviewTask savedTask = reviewTaskRepository.save(task);

        // Audit Log: Task Creation
        logAction("SYSTEM", "REVIEW_TASK_CREATED",
                "Created review task ID " + savedTask.getId() + " for violation " + violationType);

        return savedTask;
    }

    public ReviewTask updateDecision(Long taskId, ApprovalStatus status, String reason) {
        ReviewTask task = reviewTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setDecision(status);
        task.setReason(reason);
        ReviewTask updatedTask = reviewTaskRepository.save(task);

        // Audit Log: Manager Decision
        // (In real security context, we'd get the actual logged-in user ID)
        logAction("Manager ID: " + task.getManagerId(), "DECISION_" + status,
                "Decision: " + status + ". Reason: " + reason);

        return updatedTask;
    }

    public List<ReviewTask> getTasksForManager(Long managerId) {
        return reviewTaskRepository.findByManagerIdAndDecision(managerId, ApprovalStatus.PENDING);
    }

    private void logAction(String actor, String action, String details) {
        AuditLog log = new AuditLog();
        log.setActor(actor);
        log.setAction(action);
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
