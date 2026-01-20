import React, { useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';

export default function CandidateBgvPortal() {
    const { id } = useParams(); // employeeId from URL
    const [formData, setFormData] = useState({
        resumeUrl: '',
        adhaarUrl: '',
        panUrl: '',
        drivingLicenseUrl: '',
        relievingLetterUrl: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/bgv/upload-docs', null, {
                params: {
                    employeeId: id,
                    ...formData
                }
            });
            setMessage('Documents Submitted Successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Submission Failed. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: '#1e293b', borderRadius: '1rem', color: 'white' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Candidate Document Upload</h1>
            {message && <div style={{ padding: '1rem', background: message.includes('Success') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', marginBottom: '1rem', borderRadius: '0.5rem' }}>{message}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Resume URL</label>
                    <input
                        required
                        style={inputStyle}
                        value={formData.resumeUrl}
                        onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Adhaar Card URL</label>
                    <input
                        required
                        style={inputStyle}
                        value={formData.adhaarUrl}
                        onChange={e => setFormData({ ...formData, adhaarUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>PAN Card URL</label>
                    <input
                        required
                        style={inputStyle}
                        value={formData.panUrl}
                        onChange={e => setFormData({ ...formData, panUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Driving License URL (Optional)</label>
                    <input
                        style={inputStyle}
                        value={formData.drivingLicenseUrl}
                        onChange={e => setFormData({ ...formData, drivingLicenseUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Relieving Letter URL</label>
                    <input
                        required
                        style={inputStyle}
                        value={formData.relievingLetterUrl}
                        onChange={e => setFormData({ ...formData, relievingLetterUrl: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Submit Documents</button>
            </form>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    color: 'white'
};
