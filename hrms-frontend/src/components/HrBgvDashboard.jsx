import React, { useState } from 'react';
import api from '../services/api';

export default function HrBgvDashboard() {
    const [employeeId, setEmployeeId] = useState('');
    const [bgvData, setBgvData] = useState(null);
    const [error, setError] = useState('');

    const fetchBgv = async () => {
        try {
            const res = await api.get('/bgv/status', { params: { employeeId } });
            setBgvData(res.data);
            setError('');
        } catch (err) {
            setBgvData(null);
            setError('BGV Record not found for this ID');
        }
    };

    const handleValidate = async (status) => {
        try {
            const res = await api.put('/bgv/validate', null, {
                params: {
                    employeeId,
                    status,
                    remarks: status === 'CLEARED' ? 'Documents Verified' : 'Discrepancy found'
                }
            });
            setBgvData(res.data);
            alert(`BGV Marked as ${status}`);
        } catch (err) {
            alert('Action Failed');
        }
    };

    const generateOffer = async () => {
        try {
            const res = await api.post('/bgv/generate-offer', null, { params: { employeeId } });
            setBgvData(res.data);
            alert('Offer Letter Generated and Sent!');
        } catch (err) {
            alert('Failed to generate offer');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>HR Background Verification Portal</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    placeholder="Enter Employee ID"
                    value={employeeId}
                    onChange={e => setEmployeeId(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                />
                <button className="btn btn-primary" onClick={fetchBgv}>Fetch</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {bgvData && (
                <div className="glass-card" style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2>BGV Status: <span style={{ color: getStatusColor(bgvData.status) }}>{bgvData.status}</span></h2>
                        {bgvData.status === 'CLEARED' && (
                            <button className="btn" style={{ background: '#8b5cf6' }} onClick={generateOffer}>Generate Offer Letter</button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                        <DocLink label="Resume" url={bgvData.resumeUrl} />
                        <DocLink label="Adhaar" url={bgvData.adhaarUrl} />
                        <DocLink label="PAN" url={bgvData.panUrl} />
                        <DocLink label="License" url={bgvData.drivingLicenseUrl} />
                        <DocLink label="Relieving Letter" url={bgvData.relievingLetterUrl} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <button className="btn" style={{ background: 'green' }} onClick={() => handleValidate('CLEARED')}>Approve & Clear</button>
                        <button className="btn" style={{ background: 'red' }} onClick={() => handleValidate('FAILED')}>Reject & Fail</button>
                    </div>
                </div>
            )}
        </div>
    );
}

function DocLink({ label, url }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
            <span>{label}</span>
            {url ? (
                <a href={url} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>View Document</a>
            ) : (
                <span style={{ color: '#aaa' }}>Not Uploaded</span>
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'CLEARED': return '#34d399';
        case 'FAILED': return '#f87171';
        case 'OFFER_GENERATED': return '#fbbf24';
        default: return '#9ca3af';
    }
}
