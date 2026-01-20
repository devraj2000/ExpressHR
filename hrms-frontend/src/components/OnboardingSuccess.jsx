import React, { useEffect, useState } from 'react';

export default function OnboardingSuccess({ employee, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            // Keep it visible until closed
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                position: 'relative',
                animation: 'popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', textAlign: 'center' }}>🎉</div>
                <h1 style={{
                    fontSize: '3rem', fontWeight: 'bold',
                    background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem'
                }}>
                    Welcome Aboard!
                </h1>
            </div>

            <div style={{
                background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '1rem',
                backdropFilter: 'blur(10px)', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)',
                animation: 'fadeInUp 1s ease-out 0.5s both', maxWidth: '400px'
            }}>
                <p style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>You have successfully hired</p>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{employee.name}</h2>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                    <small style={{ color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Employee ID</small>
                    <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', letterSpacing: '2px', color: '#fcd34d' }}>{employee.employeeId}</span>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={onClose}
                    style={{ width: '100%', fontSize: '1.1rem', padding: '0.75rem' }}
                >
                    Continue to Dashboard
                </button>
            </div>

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeInUp {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
