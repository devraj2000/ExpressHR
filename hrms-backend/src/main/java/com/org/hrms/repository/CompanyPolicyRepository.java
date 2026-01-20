package com.org.hrms.repository;

import com.org.hrms.model.CompanyPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CompanyPolicyRepository extends JpaRepository<CompanyPolicy, Long> {
    List<CompanyPolicy> findByCategory(String category);
}
