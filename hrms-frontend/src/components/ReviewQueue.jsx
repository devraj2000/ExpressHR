import React, { useEffect, useState } from 'react';
import { getReviewTasks, reviewTask } from '../services/api';

export default function ReviewQueue() {
    const [tasks, setTasks] = useState([]);
    const [managerId, setManagerId] = useState(1); // Hardcoded for demo
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, [managerId]);

    const fetchTasks = async () => {
        try {
            const res = await getReviewTasks(managerId);
            setTasks(res.data);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDecision = async (id, decision) => {
        try {
            await reviewTask(id, decision, "Manual Review"); // Simple reason for now
            fetchTasks(); // Refresh list
        } catch (err) {
            console.error("Failed to submit review", err);
        }
    };

    if (loading) return <div>Loading reviews...</div>;

    return (
        <div className="glass-card">
            <h2>Manager Review Queue</h2>
            {tasks.length === 0 ? (
                <p>No pending reviews.</p>
            ) : (
                <div className="review-list">
                    {tasks.map(task => (
                        <div key={task.id} className="review-item">
                            <div>
                                <strong>Employee ID: {task.employeeId}</strong>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                    Detected Issue: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{task.violationType}</span>
                                </p>
                                <p>Status: {task.decision}</p>
                            </div>
                            <div className="review-actions">
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleDecision(task.id, 'APPROVED')}
                                >
                                    Confirm Penalty
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDecision(task.id, 'REJECTED')}
                                >
                                    Override / Waive
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
