package com.org.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class LeaveBalance {
    @Id
    private Long employeeId; // One balance record per employee

    private double clBalance; // Default 12.0
    private double slBalance; // Default 12.0

    public LeaveBalance() {
    }

    public LeaveBalance(Long employeeId, double cl, double sl) {
        this.employeeId = employeeId;
        this.clBalance = cl;
        this.slBalance = sl;
    }
}
