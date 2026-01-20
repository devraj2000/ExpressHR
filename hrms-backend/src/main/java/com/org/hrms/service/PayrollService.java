package com.org.hrms.service;

import com.org.hrms.model.Payslip;
import com.org.hrms.repository.PayslipRepository;
import com.org.hrms.model.Employee;
import com.org.hrms.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final com.org.hrms.repository.PayslipRepository payslipRepository;
    private final EmployeeRepository employeeRepository;

    public Payslip generatePayrollData(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Simplistic logic
        double baseSalary = 50000.0;
        double allowances = 5000.0;
        double deductions = 1000.0; // static for now
        double net = baseSalary + allowances - deductions;

        Payslip payslip = new Payslip();
        payslip.setEmployeeId(employeeId);
        payslip.setMonth(java.time.LocalDate.now());
        payslip.setBasicSalary(baseSalary);
        payslip.setAllowances(allowances);
        payslip.setDeductions(deductions);
        payslip.setNetSalary(net);
        // In real app, generate PDF and upload to S3/Cloudinary
        payslip.setPdfUrl("http://mock-url.com/payslip_" + employeeId + ".pdf");

        return payslipRepository.save(payslip);
    }

    public List<Payslip> getPayslipHistory(Long employeeId) {
        return payslipRepository.findByEmployeeId(employeeId);
    }
}
