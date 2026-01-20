import React, { useState, useEffect } from 'react';
import api, { cancelLeave } from '../services/api';

export default function LeavePortal({ employeeId = 1 }) {
    const [formData, setFormData] = useState({
        type: 'CL',
        startDate: '',
        endDate: '',
        reason: '',
        isHalfDay: false
    });
    const [message, setMessage] = useState('');
    const [leaves, setLeaves] = useState([]); // In real app, fetch these

    // Mock fetch leaves (replace with API call if endpoint exists)
    // For now, we assume parent passes leaves or we just show applied ones

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.applyLeave({
                employeeId: employeeId,
                ...formData
            });
            setMessage('Leave Applied Successfully!');
            // Refresh leaves list
        } catch (error) {
            console.error(error);
            setMessage('Error applying leave.');
        }
    };

    const handleCancel = async (id) => {
        try {
            await cancelLeave(id);
            setMessage('Leave Cancelled Successfully');
            // Refresh leaves
        } catch (error) {
            setMessage('Failed to cancel leave');
        }
    };

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h2>Leave Application</h2>
            {message && <p style={{ color: message.includes('Success') ? '#34d399' : '#f87171' }}>{message}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            style={{ padding: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem' }}
                        >
                            <option value="CL" style={{ color: 'black' }}>Casual Leave</option>
                            <option value="SL" style={{ color: 'black' }}>Sick Leave</option>
                            <option value="LOP" style={{ color: 'black' }}>Loss of Pay</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.5rem' }}>
                        <input
                            type="checkbox"
                            id="halfDay"
                            checked={formData.isHalfDay}
                            onChange={(e) => setFormData({ ...formData, isHalfDay: e.target.checked })}
                        />
                        <label htmlFor="halfDay">Half Day</label>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label>From</label>
                        <input
                            type="date"
                            required
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            style={{ padding: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label>To</label>
                        <input
                            type="date"
                            required
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            style={{ padding: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem' }}
                        />
                    </div>
                </div>

                <div>
                    <label>Reason</label>
                    <textarea
                        required
                        rows="3"
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        style={{ padding: '0.5rem', width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '0.5rem' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Submit Request</button>
            </form>
        </div>
    );
}
