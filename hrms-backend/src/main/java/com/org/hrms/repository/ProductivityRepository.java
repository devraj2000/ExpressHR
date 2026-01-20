package com.org.hrms.repository;

import com.org.hrms.model.ProductivityRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductivityRepository extends JpaRepository<ProductivityRecord, Long> {
    List<ProductivityRecord> findByEmployeeId(Long employeeId);

    List<ProductivityRecord> findByWorkDate(LocalDate workDate);
}
