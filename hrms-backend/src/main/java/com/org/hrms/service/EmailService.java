package com.org.hrms.service;

import com.org.hrms.model.Employee;
import com.org.hrms.model.ViolationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendViolationAlert(Employee employee, ViolationType type) {
        String subject = "Automated HR Alert: " + type;
        String body = String.format("Dear %s, your productivity score was below threshold. Action: %s triggered.",
                employee.getName(), type);

        // Simulating email sending
        logger.info(">>> SENDING EMAIL TO: {}", employee.getEmail());
        logger.info(">>> SUBJECT: {}", subject);
        logger.info(">>> BODY: {}", body);
    }

    public void sendManagerActionRequired(Long managerId, Employee employee, ViolationType type) {
        logger.info(">>> NOTIFYING MANAGER (ID: {}): Review needed for {} - Potential {}",
                managerId, employee.getName(), type);
    }
}
