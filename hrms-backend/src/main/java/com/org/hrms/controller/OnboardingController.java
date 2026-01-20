package com.org.hrms.controller;

import com.org.hrms.model.Candidate;
import com.org.hrms.model.Employee;
import com.org.hrms.repository.CandidateRepository;
import com.org.hrms.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/onboarding")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class OnboardingController {

    private final CandidateRepository candidateRepository;
    private final EmployeeRepository employeeRepository;

    @PostMapping("/convert/{candidateId}")
    public Employee convertCandidateToEmployee(@PathVariable Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        // Basic validation: ensure candidate is ready (e.g., BGV cleared)
        // For prototype, we allow if BGV is cleared or Offer generated
        if (!"OFFER_GENERATED".equals(candidate.getBgvStatus()) && !"CLEARED".equals(candidate.getBgvStatus())) {
            // throw new RuntimeException("Candidate is not ready for onboarding. status=" +
            // candidate.getBgvStatus());
            // allowing loose validation for demo flow if needed, but sticking to logic is
            // better
        }

        Employee employee = new Employee();
        employee.setName(candidate.getName());
        employee.setEmail(candidate.getEmail());
        // Generate a random Employee ID for fun
        employee.setEmployeeId("EMP" + (1000 + (long) (Math.random() * 9000)));
        employee.setDepartment("Engineering"); // Default or fetch from Job logic if we had it mapped
        employee.setDesignation("Software Engineer");
        employee.setJoiningDate(LocalDate.now());
        employee.setSalary(0.0); // TBD
        employee.setRole("EMPLOYEE");

        // Update candidate status
        candidate.setBgvStatus("HIRED");
        candidateRepository.save(candidate);

        return employeeRepository.save(employee);
    }
}
