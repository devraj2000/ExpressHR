package com.org.hrms.controller;

import com.org.hrms.model.Interview;
import com.org.hrms.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewRepository interviewRepository;

    @PostMapping("/schedule")
    public Interview scheduleInterview(@RequestBody Interview interview) {
        interview.setStatus("SCHEDULED");
        // Ensure time is handled correctly from JSON, usually auto-mapped if format is
        // ISO
        return interviewRepository.save(interview);
    }

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }
}
