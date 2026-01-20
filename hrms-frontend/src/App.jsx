import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeView from './components/EmployeeView';
import CandidateBgvPortal from './components/CandidateBgvPortal';
import HrBgvDashboard from './components/HrBgvDashboard';
import CandidateExamPortal from './components/CandidateExamPortal';
import HrRecruitmentDashboard from './components/HrRecruitmentDashboard';
import JobBoard from './components/JobBoard';
import CandidateDashboard from './components/CandidateDashboard';

function App() {
    const [role, setRole] = useState('MANAGER'); // HR, MANAGER, EMPLOYEE

    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <div className="nav-brand">
                        <div className="logo">🚀</div>
                        <h1>ExpressHR</h1>
                        <span className="role-badge">{role} VIEW</span>
                    </div>

                    <div className="role-switcher">
                        {['HR', 'MANAGER', 'EMPLOYEE'].map(r => (
                            <button key={r} onClick={() => setRole(r)} className={`role-btn ${role === r ? 'active' : ''}`}>
                                {r}
                            </button>
                        ))}
                    </div>

                    <div className="nav-links">
                        <Link to="/jobs" className="nav-link">Careers</Link>

                        {role === 'HR' && (
                            <>
                                <Link to="/hr/recruitment" className="nav-link">Recruitment</Link>
                                <Link to="/hr/bgv" className="nav-link">BGV</Link>
                            </>
                        )}

                        {(role === 'MANAGER' || role === 'EMPLOYEE') && (
                            <Link to="/" className="nav-link">Dashboard</Link>
                        )}

                        <Link to="/candidate/dashboard" className="btn-secondary">Candidate Login</Link>
                    </div>
                </nav>

                <main className="content">
                    <Routes>
                        <Route path="/" element={role === 'MANAGER' ? <Dashboard /> : <EmployeeView />} />
                        <Route path="/jobs" element={<JobBoard />} />
                        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                        <Route path="/candidate/bgv/:id" element={<CandidateBgvPortal />} />
                        <Route path="/hr/bgv" element={<HrBgvDashboard />} />
                        <Route path="/candidate/exam" element={<CandidateExamPortal />} />
                        <Route path="/hr/recruitment" element={<HrRecruitmentDashboard />} />
                    </Routes>
                </main>
            </div>
            <style>{`
        body { margin: 0; font-family: 'Inter', sans-serif; background: #0f172a; color: white; }
        .app-container { min-height: 100vh; display: flex; flex-direction: column; }
        
        .navbar {
          display: flex; justify-content: space-between; align-items: center;
          padding: 1rem 2rem; background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.1);
          position: sticky; top: 0; z-index: 100;
        }
        
        .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
        .logo { font-size: 1.5rem; }
        .nav-brand h1 { margin: 0; font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .role-badge { font-size: 0.7rem; background: rgba(255,255,255,0.1); padding: 0.25rem 0.5rem; border-radius: 4px; color: #94a3b8; letter-spacing: 0.05em; }

        .role-switcher { display: flex; background: rgba(0,0,0,0.2); padding: 0.25rem; border-radius: 0.5rem; }
        .role-btn { background: transparent; border: none; color: #64748b; padding: 0.4rem 0.8rem; border-radius: 0.35rem; cursor: pointer; font-size: 0.8rem; font-weight: 500; transition: all 0.2s; }
        .role-btn.active { background: #3b82f6; color: white; shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .role-btn:hover:not(.active) { color: white; }

        .nav-links { display: flex; gap: 1.5rem; align-items: center; }
        .nav-link { color: #cbd5e1; text-decoration: none; font-size: 0.95rem; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: white; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        
        .btn-secondary { padding: 0.5rem 1rem; border: 1px solid #475569; border-radius: 0.5rem; color: white; text-decoration: none; font-size: 0.9rem; transition: all 0.2s; background: rgba(255,255,255,0.03); }
        .btn-secondary:hover { background: rgba(255,255,255,0.1); border-color: #94a3b8; }

        .content { padding: 2rem; max-width: 1200px; margin: 0 auto; width: 100%; box-sizing: border-box; }
        
        /* Global Card & Input Styles */
        .glass-card { background: rgba(30, 41, 59, 0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; }
        .btn { padding: 0.6rem 1.2rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 600; transition: transform 0.1s, filter 0.2s; }
        .btn:active { transform: scale(0.98); }
        .btn-primary { background: linear-gradient(to right, #3b82f6, #2563eb); color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
        .btn-primary:hover { filter: brightness(1.1); }
        
        input, select, textarea { width: 100%; padding: 0.75rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; color: white; margin-bottom: 0.5rem; }
        input:focus { outline: none; border-color: #60a5fa; ring: 2px solid rgba(96, 165, 250, 0.2); }
      `}</style>
        </Router>
    );
}

export default App;
