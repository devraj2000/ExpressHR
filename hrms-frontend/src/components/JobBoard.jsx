import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function JobBoard() {
    const [jobs, setJobs] = useState([]);
    const [applyingJob, setApplyingJob] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', resumeUrl: '' });

    useEffect(() => {
        api.get('/recruitment/jobs').then(res => setJobs(res.data));
    }, []);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            await api.post('/recruitment/candidates/apply', {
                ...formData,
                jobId: applyingJob.id
            });
            alert('Application Submitted! Please check your Dashboard.');
            setApplyingJob(null);
            setFormData({ name: '', email: '', resumeUrl: '' });
        } catch (error) {
            alert('Application Failed');
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Careers at ExpressHR</h1>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                {jobs.map(job => (
                    <div key={job.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '1rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2>{job.title}</h2>
                            <p style={{ color: '#aaa', margin: '0.5rem 0' }}>{job.description}</p>
                            <small>Posted: {job.postedDate}</small>
                        </div>
                        <button className="btn btn-primary" onClick={() => setApplyingJob(job)}>Apply Now</button>
                    </div>
                ))}
            </div>

            {applyingJob && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '1rem', width: '400px', color: 'white' }}>
                        <h3>Apply for {applyingJob.title}</h3>
                        <form onSubmit={handleApply} style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                            <input required placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} />
                            <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                            <input required placeholder="Resume URL" value={formData.resumeUrl} onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })} style={inputStyle} />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit</button>
                                <button type="button" className="btn" style={{ flex: 1, background: '#64748b' }} onClick={() => setApplyingJob(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' };
