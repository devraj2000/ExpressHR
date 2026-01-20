import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

import EmployeeView from './components/EmployeeView';
import CandidateBgvPortal from './components/CandidateBgvPortal';
import HrBgvDashboard from './components/HrBgvDashboard';
import CandidateExamPortal from './components/CandidateExamPortal';
import HrRecruitmentDashboard from './components/HrRecruitmentDashboard';
import JobBoard from './components/JobBoard';
import CandidateDashboard from './components/CandidateDashboard';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState('MANAGER'); // MANAGER or EMPLOYEE

  return (
    <Router>
      <div className="app-container">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ExpressHR</h1>
          <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem' }}>
            <a href="/jobs" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Careers</a>
            <button
              className={`btn ${role === 'MANAGER' ? 'btn-primary' : ''}`}
              style={{ background: role === 'MANAGER' ? '' : 'transparent' }}
              onClick={() => setRole('MANAGER')}
            >
              Manager View
            </button>
            <button
              className={`btn ${role === 'EMPLOYEE' ? 'btn-primary' : ''}`}
              style={{ background: role === 'EMPLOYEE' ? '' : 'transparent' }}
              onClick={() => setRole('EMPLOYEE')}
            >
              Employee View
            </button>
            <a href="/candidate/dashboard" style={{ marginLeft: '1rem', color: 'white', textDecoration: 'none', border: '1px solid white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Candidate Portal</a>
            <a href="/hr/recruitment" style={{ marginLeft: '0.5rem', color: 'white', textDecoration: 'none', border: '1px solid white', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>HR Portal</a>
          </div>
        </header>

        <Routes>
          <Route path="/" element={role === 'MANAGER' ? <Dashboard /> : <EmployeeView />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/bgv/:id" element={<CandidateBgvPortal />} />
          <Route path="/hr/bgv" element={<HrBgvDashboard />} />
          <Route path="/candidate/exam" element={<CandidateExamPortal />} />
          <Route path="/hr/recruitment" element={<HrRecruitmentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
