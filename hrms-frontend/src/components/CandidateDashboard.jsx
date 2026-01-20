import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CandidateDashboard() {
    const [email, setEmail] = useState('');
    const [candidate, setCandidate] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Simulation: Find candidate by filtering all (In real app, proper login)
            const res = await api.get('/recruitment/candidates');
            const found = res.data.find(c => c.email === email);
            if (found) {
                setCandidate(found);
            } else {
                alert('No application found for this email.');
            }
        } catch (e) {
            alert('Error fetching details');
        }
    };

    const getStepStatus = (step) => {
        if (!candidate) return 'pending';

        switch (step) {
            case 'APP': return candidate.applicationStatus === 'SHORTLISTED' ? 'completed' : 'active';
            case 'EXAM':
                if (candidate.applicationStatus !== 'SHORTLISTED') return 'locked';
                return candidate.examStatus === 'PASSED' ? 'completed' : candidate.examStatus === 'PENDING' ? 'active' : 'failed';
            case 'INTERVIEW':
                if (candidate.examStatus !== 'PASSED') return 'locked';
                return candidate.interviewStatus === 'CLEARED' ? 'completed' : 'active';
            case 'BGV':
                if (candidate.interviewStatus !== 'CLEARED') return 'locked';
                return candidate.bgvStatus === 'CLEARED' || candidate.bgvStatus === 'OFFER_GENERATED' ? 'completed' : 'active';
            case 'OFFER':
                return candidate.bgvStatus === 'OFFER_GENERATED' ? 'completed' : 'locked';
            default: return 'locked';
        }
    };

    const refresh = async () => {
        const res = await api.get(`/recruitment/candidates/${candidate.id}`);
        setCandidate(res.data);
    };

    if (!candidate) return (
        <div style={{ maxWidth: '400px', margin: '10vh auto', padding: '2rem', background: '#1e293b', borderRadius: '1rem', color: 'white', textAlign: 'center' }}>
            <h2>Candidate Portal Login</h2>
            <input placeholder="Enter Registered Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '1rem', margin: '1rem 0', borderRadius: '0.5rem', border: 'none' }} />
            <button className="btn btn-primary" onClick={handleLogin} style={{ width: '100%' }}>Check Status</button>
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Welcome, {candidate.name}</h1>
                <button className="btn" onClick={refresh}>↻ Refresh</button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <StatusCard title="1. Application" status={getStepStatus('APP')} details={`Status: ${candidate.applicationStatus}`} />

                <StatusCard title="2. Online Exam" status={getStepStatus('EXAM')}
                    details={`Status: ${candidate.examStatus} ${candidate.examScore ? `(${candidate.examScore}%)` : ''}`}
                    action={getStepStatus('EXAM') === 'active' && <button className="btn btn-primary" onClick={() => navigate('/candidate/exam')}>Take Exam</button>}
                />

                <StatusCard title="3. Technical Interview" status={getStepStatus('INTERVIEW')}
                    details={`Status: ${candidate.interviewStatus}`}
                />

                <StatusCard title="4. Background Verification" status={getStepStatus('BGV')}
                    details={`Status: ${candidate.bgvStatus || 'Pending'}`}
                    action={getStepStatus('BGV') === 'active' && <button className="btn btn-primary" onClick={() => navigate(`/candidate/bgv/${candidate.id}`)}>Upload Documents</button>}
                />

                <StatusCard title="5. Offer Letter" status={getStepStatus('OFFER')}
                    details={getStepStatus('OFFER') === 'completed' ? "Offer Letter Generated! Check your email." : "Pending"}
                />
            </div>
        </div>
    );
}

function StatusCard({ title, status, details, action }) {
    const bg = status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : status === 'active' ? 'rgba(59, 130, 246, 0.2)' : status === 'failed' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)';
    const color = status === 'locked' ? '#64748b' : 'white';

    return (
        <div style={{ padding: '1.5rem', background: bg, borderRadius: '1rem', color, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3>{title}</h3>
                <p>{details}</p>
            </div>
            {action}
        </div>
    );
}
