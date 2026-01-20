package com.org.hrms.controller;

import com.org.hrms.model.ApprovalStatus;
import com.org.hrms.model.ReviewTask;
import com.org.hrms.service.ReviewWorkflowService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8520")
public class ReviewController {
    private final ReviewWorkflowService reviewWorkflowService;

    @GetMapping
    public List<ReviewTask> getReviews(@RequestParam(required = false) Long managerId) {
        // Simple filter for now
        if (managerId != null) {
            return reviewWorkflowService.getTasksForManager(managerId);
        }
        // In real app, we shouldn't return all, but for dev:
        return List.of();
    }

    // Review Request DTO
    @Data
    public static class ReviewRequest {
        private String decision; // APPROVED, REJECTED
        private String reason;
    }

    @PostMapping("/{id}")
    public ReviewTask reviewTask(@PathVariable Long id, @RequestBody ReviewRequest request) {
        return reviewWorkflowService.updateDecision(
                id,
                ApprovalStatus.valueOf(request.getDecision()),
                request.getReason());
    }
}
