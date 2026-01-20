import React, { useState, useEffect } from 'react';
import { getHolidays, getPolicies } from '../services/api';

export default function PolicyView() {
    const [holidays, setHolidays] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [activeTab, setActiveTab] = useState('HOLIDAYS');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [hRes, pRes] = await Promise.all([getHolidays(), getPolicies()]);
            setHolidays(hRes.data);
            setPolicies(pRes.data);
        } catch (error) {
            console.error("Failed to load generic data", error);
        }
    };

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <button
                    className={`btn ${activeTab === 'HOLIDAYS' ? 'btn-primary' : ''}`}
                    onClick={() => setActiveTab('HOLIDAYS')}
                >
                    Holiday Calendar
                </button>
                <button
                    className={`btn ${activeTab === 'POLICIES' ? 'btn-primary' : ''}`}
                    onClick={() => setActiveTab('POLICIES')}
                >
                    Company Policies
                </button>
            </div>

            {activeTab === 'HOLIDAYS' && (
                <div>
                    <h3>Upcoming Holidays</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {holidays.map(h => (
                            <li key={h.id} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{h.name}</span>
                                <span style={{ color: '#aaa' }}>{h.date}</span>
                            </li>
                        ))}
                        {holidays.length === 0 && <p>No holidays found.</p>}
                    </ul>
                </div>
            )}

            {activeTab === 'POLICIES' && (
                <div>
                    <h3>Company Policies</h3>
                    {policies.map(p => (
                        <div key={p.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', marginBottom: '1rem', borderRadius: '0.5rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>{p.title}</h4>
                            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>{p.content}</p>
                            <span style={{ fontSize: '0.8rem', background: '#333', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>{p.category}</span>
                        </div>
                    ))}
                    {policies.length === 0 && <p>No policies found.</p>}
                </div>
            )}
        </div>
    );
}
