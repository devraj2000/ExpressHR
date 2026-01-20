package com.org.hrms.repository;

import com.org.hrms.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByStatus(String status);
}
