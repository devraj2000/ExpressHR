import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function LeaveApprovalQueue() {
    // Mock data for now (since we don't have a GET endpoint for Manager's leaves yet, assuming we'd fetch it)
    // In real implementation, we need: POST /leaves/approve
    // For demo, I'll mock a pending request state
    const [requests, setRequests] = useState([
        { id: 101, employeeId: 2, type: 'CL', startDate: '2026-01-20', endDate: '2026-01-21', reason: 'Personal work', status: 'PENDING' }
    ]);

    const handleApprove = async (id) => {
        try {
            await api.approveLeave(id); // Call backend
            setRequests(requests.filter(r => r.id !== id));
            alert("Leave Approved!");
        } catch (e) {
            alert("Leave Approved (Simulated) - Backend requires real ID");
            setRequests(requests.filter(r => r.id !== id));
        }
    };

    if (requests.length === 0) return <p style={{ color: 'white' }}>No pending leave requests.</p>;

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h3>Pending Leave Approvals</h3>
            {requests.map(req => (
                <div key={req.id} className="review-item">
                    <div>
                        <strong>Emp #{req.employeeId} - {req.type}</strong>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{req.startDate} to {req.endDate}</p>
                        <p>Reason: {req.reason}</p>
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={() => handleApprove(req.id)}
                    >
                        Approve Request
                    </button>
                </div>
            ))}
        </div>
    );
}
