package com.org.hrms.service;

import com.org.hrms.model.*;
import com.org.hrms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GeneralService {
    private final HolidayRepository holidayRepository;
    private final CompanyPolicyRepository companyPolicyRepository;
    private final EmployeeDocumentRepository employeeDocumentRepository;

    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    public List<CompanyPolicy> getAllPolicies() {
        return companyPolicyRepository.findAll();
    }

    public List<CompanyPolicy> getPoliciesByCategory(String category) {
        return companyPolicyRepository.findByCategory(category);
    }

    public List<EmployeeDocument> getEmployeeDocuments(Long employeeId) {
        return employeeDocumentRepository.findByEmployeeId(employeeId);
    }

    public EmployeeDocument uploadDocument(Long employeeId, String type, String url) {
        EmployeeDocument doc = new EmployeeDocument();
        doc.setEmployeeId(employeeId);
        doc.setDocumentType(type);
        doc.setDocumentUrl(url);
        return employeeDocumentRepository.save(doc);
    }
}
