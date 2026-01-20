import React, { useState, useEffect } from 'react';
import LeavePortal from './LeavePortal';
import PayslipView from './PayslipView';
import PolicyView from './PolicyView';
import DocumentView from './DocumentView';
import { getEmployee, updateEmployee } from '../services/api';

export default function EmployeeView() {
    const employeeId = 1; // Mock
    const [view, setView] = useState('DASHBOARD');
    const [employee, setEmployee] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    // Mock stats
    const stats = {
        productivity: 85,
        date: new Date().toLocaleDateString()
    };

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {
        try {
            // Mock response if API not ready or empty
            // const res = await getEmployee(employeeId); 
            // setEmployee(res.data);
            // setFormData(res.data);

            // Fallback mockdata for UI dev
            const mock = {
                id: 1,
                name: "Devraj Roy",
                bankName: "HDFC Bank",
                accountNumber: "1234567890",
                ifscCode: "HDFC000123",
                adhaarNumber: "1234-5678-9012",
                panNumber: "ABCDE1234F"
            };
            setEmployee(mock);
            setFormData(mock);

        } catch (error) {
            console.error("Failed to fetch employee", error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            await updateEmployee(employeeId, formData);
            setEmployee(formData);
            setEditMode(false);
            alert("Profile Updated!");
        } catch (error) {
            alert("Failed to update profile (Mock API might be missing endpoint)");
        }
    };

    const renderDashboard = () => (
        <div className="dashboard-grid">
            <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
                <h3>Today's Score</h3>
                <h1 style={{ margin: '0.5rem 0', color: '#60a5fa' }}>{stats.productivity}%</h1>
                <p>{stats.date}</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
                <h3>Status</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#34d399' }}>Active - Good Standing</p>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>My Profile</h2>
                <button className="btn" onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}>
                    {editMode ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ color: '#aaa' }}>Bank Name</label>
                        <input
                            disabled={!editMode}
                            value={formData.bankName || ''}
                            onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={{ color: '#aaa' }}>Account Number</label>
                        <input
                            disabled={!editMode}
                            value={formData.accountNumber || ''}
                            onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ color: '#aaa' }}>IFSC Code</label>
                        <input
                            disabled={!editMode}
                            value={formData.ifscCode || ''}
                            onChange={e => setFormData({ ...formData, ifscCode: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={{ color: '#aaa' }}>PAN Number</label>
                        <input
                            disabled={!editMode}
                            value={formData.panNumber || ''}
                            onChange={e => setFormData({ ...formData, panNumber: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>
                <div>
                    <label style={{ color: '#aaa' }}>Adhaar Number</label>
                    <input
                        disabled={!editMode}
                        value={formData.adhaarNumber || ''}
                        onChange={e => setFormData({ ...formData, adhaarNumber: e.target.value })}
                        style={inputStyle}
                    />
                </div>
            </div>
        </div>
    );

    const inputStyle = {
        width: '100%',
        padding: '0.5rem',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        color: 'white',
        marginTop: '0.25rem'
    };

    return (
        <div className="container">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Welcome, {employee?.name || 'Employee'}</h1>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', overflowX: 'auto' }}>
                    {['DASHBOARD', 'PROFILE', 'LEAVE', 'PAYSLIP', 'POLICIES', 'DOCUMENTS'].map(tab => (
                        <button
                            key={tab}
                            className={`btn ${view === tab ? 'btn-primary' : ''}`}
                            onClick={() => setView(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {view === 'DASHBOARD' && renderDashboard()}
            {view === 'PROFILE' && renderProfile()}
            {view === 'LEAVE' && <LeavePortal employeeId={employeeId} />}
            {view === 'PAYSLIP' && <PayslipView employeeId={employeeId} />}
            {view === 'POLICIES' && <PolicyView />}
            {view === 'DOCUMENTS' && <DocumentView employeeId={employeeId} />}
        </div>
    );
}


