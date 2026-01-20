package com.org.hrms.controller;

import com.org.hrms.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollService payrollService;

    @GetMapping("/generate")
    public com.org.hrms.model.Payslip generatePayslip(@RequestParam Long employeeId) {
        return payrollService.generatePayrollData(employeeId);
    }

    @GetMapping("/history")
    public java.util.List<com.org.hrms.model.Payslip> getPayslipHistory(@RequestParam Long employeeId) {
        return payrollService.getPayslipHistory(employeeId);
    }
}
