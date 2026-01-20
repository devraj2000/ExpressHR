package com.org.hrms.controller;

import com.org.hrms.model.*;
import com.org.hrms.service.GeneralService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/general")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class GeneralController {

    private final GeneralService generalService;

    @GetMapping("/holidays")
    public List<Holiday> getHolidays() {
        return generalService.getAllHolidays();
    }

    @GetMapping("/policies")
    public List<CompanyPolicy> getPolicies(@RequestParam(required = false) String category) {
        if (category != null) {
            return generalService.getPoliciesByCategory(category);
        }
        return generalService.getAllPolicies();
    }

    @GetMapping("/documents")
    public List<EmployeeDocument> getDocuments(@RequestParam Long employeeId) {
        return generalService.getEmployeeDocuments(employeeId);
    }

    @PostMapping("/documents")
    public EmployeeDocument uploadDocument(
            @RequestParam Long employeeId,
            @RequestParam String type,
            @RequestParam String url) {
        return generalService.uploadDocument(employeeId, type, url);
    }
}
