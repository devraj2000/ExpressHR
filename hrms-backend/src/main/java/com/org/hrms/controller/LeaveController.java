package com.org.hrms.controller;

import com.org.hrms.model.LeaveRequest;
import com.org.hrms.model.LeaveType;
import com.org.hrms.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping("/apply")
    public LeaveRequest applyLeave(
            @RequestParam Long employeeId,
            @RequestParam LeaveType type,
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestParam String reason,
            @RequestParam(defaultValue = "false") boolean isHalfDay) {

        return leaveService.applyLeave(employeeId, type, LocalDate.parse(startDate), LocalDate.parse(endDate), reason,
                isHalfDay);
    }

    @PostMapping("/{requestId}/approve")
    public LeaveRequest approveLeave(@PathVariable Long requestId) {
        return leaveService.approveLeave(requestId);
    }

    @PutMapping("/{requestId}/cancel")
    public LeaveRequest cancelLeave(@PathVariable Long requestId) {
        return leaveService.cancelLeave(requestId);
    }
}
