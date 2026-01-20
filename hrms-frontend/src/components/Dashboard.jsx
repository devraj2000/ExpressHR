import React from 'react';
import ReviewQueue from './ReviewQueue';
import LeaveApprovalQueue from './LeaveApprovalQueue';

export default function Dashboard() {
    return (
        <div>
            <h1>ExpressHR Dashboard</h1>
            <div className="dashboard-grid">
                <ReviewQueue />

                {/* Placeholder for Employee List or other stats */}
                <div className="glass-card">
                    <h2>Team Overview</h2>
                    <p>Employee productivity stats will appear here.</p>
                    <div style={{ marginTop: '1rem', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <ReviewQueue />
                    <LeaveApprovalQueue />
                </div>
            </div>
        </div>
    );
}

