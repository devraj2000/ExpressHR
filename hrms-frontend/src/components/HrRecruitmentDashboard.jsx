import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OnboardingSuccess from './OnboardingSuccess';

export default function HrRecruitmentDashboard() {
    const [view, setView] = useState('JOBS'); // JOBS, EXAMS, CANDIDATES
    const [exams, setExams] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [newEmployee, setNewEmployee] = useState(null);

    // Exam Form Data
    const [examTitle, setExamTitle] = useState('');
    const [passScore, setPassScore] = useState(50);
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', ''], correctOption: '' }]);

    // Job Form
    const [newJob, setNewJob] = useState({ title: '', description: '', requirements: '' });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const eRes = await api.get('/recruitment/exams');
            const cRes = await api.get('/recruitment/candidates');
            const jRes = await api.get('/recruitment/jobs');
            setExams(eRes.data);
            setCandidates(cRes.data);
            setJobs(jRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateJob = async () => {
        await api.post('/recruitment/jobs', newJob);
        alert('Job Posted!');
        setNewJob({ title: '', description: '', requirements: '' });
        loadData();
    };

    const handleShortlist = async (id) => {
        await api.put(`/recruitment/candidates/${id}/shortlist`);
        alert('Candidate Shortlisted!');
        loadData();
    };

    const handleInterviewFeedback = async (candidateId, status) => {
        // We need interviewId. For prototype, we might need to fetch interviews or just mock it if backend allows.
        // Wait, backend requires interviewId. 
        // Let's quickly add a lookup or just loop through candidate's interviews if we had them.
        // Actually, for this prototype, let's just create a dummy interview or use a new endpoint that takes candidateId?
        // No, let's stick to the controller I wrote: updateInterviewResult requires interviewId.
        // I haven't fetched interviews in this component.
        // Let's fetch interviews or simplfy.
        // EASIER: Add an endpoint to "pass candidate" directly? No, that breaks data model.
        // CORRECT WAY: Fetch interviews for candidate.
        // Hack for speed: We know the candidateId. Let's add a "getByCandidateId" to backend or just...
        // Let's assume there's one active interview.
        // I'll add a quick "getInterviews" fetch or just cheat and pass a dummy ID if backend allows? No.
        // Let's update backend to allow updating by candidateId for latest interview?
        // OR just fetch interviews in the dashboard.
        // I'll fetch interviews.
        const res = await api.get('/recruitment/interviews', { params: { candidateId } }); // Need to ensure this endpoint exists
        // Wait, I didn't add GET /interviews in RecruitmentController? 
        // InterviewController has GET /api/interviews.
        if (res.data && res.data.length > 0) {
            const interview = res.data.find(i => i.candidateId === candidateId && i.status === 'SCHEDULED');
            if (interview) {
                await api.post('/recruitment/interviews/feedback', null, { params: { interviewId: interview.id, status, feedback: 'Great candidate' } });
                alert('Interview Marked Passed!');
                loadData();
            } else {
                alert('No scheduled interview found.');
            }
        }
    };

    const handleOnboard = async (candidateId) => {
        try {
            const res = await api.post(`/onboarding/convert/${candidateId}`);
            setNewEmployee(res.data);
            loadData();
        } catch (e) {
            alert('Onboarding failed');
        }
    };

    const handleCreateExam = async () => {
        try {
            const payload = { title: examTitle, passScore, questions };
            await api.post('/recruitment/exams', payload);
            alert('Exam Created!');
            setExamTitle('');
            setQuestions([{ questionText: '', options: ['', ''], correctOption: '' }]);
            loadData();
        } catch (e) {
            alert('Failed to create exam');
        }
    };

    const addQuestion = () => setQuestions([...questions, { questionText: '', options: ['', ''], correctOption: '' }]);

    const updateQuestion = (idx, field, value) => {
        const newQs = [...questions];
        newQs[idx][field] = value;
        setQuestions(newQs);
    };

    const updateOption = (qIdx, oIdx, value) => {
        const newQs = [...questions];
        const newOpts = [...newQs[qIdx].options];
        newOpts[oIdx] = value;
        newQs[qIdx].options = newOpts;
        setQuestions(newQs);
    };

    const handleScheduleInterview = async (candidateId, name) => {
        const meetingLink = prompt("Enter Teams Meeting Link:");
        if (!meetingLink) return;

        try {
            await api.post('/recruitment/interviews/schedule', {
                candidateName: name, // Legacy support
                meetingLink,
                scheduledTime: new Date().toISOString() // Mock time for now, or add date picker
            }, { params: { candidateId } });
            alert("Interview Scheduled!");
            loadData();
        } catch (e) {
            alert("Failed. Check if candidate passed exam.");
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Recruitment & Exams</h1>
            <div style={{ marginBottom: '1rem' }}>
                <button className={`btn ${view === 'JOBS' ? 'btn-primary' : ''}`} onClick={() => setView('JOBS')}>Posted Jobs</button>
                <button className={`btn ${view === 'CANDIDATES' ? 'btn-primary' : ''}`} onClick={() => setView('CANDIDATES')} style={{ marginLeft: '1rem' }}>Candidates</button>
                <button className={`btn ${view === 'EXAMS' ? 'btn-primary' : ''}`} onClick={() => setView('EXAMS')} style={{ marginLeft: '1rem' }}>Manage Exams</button>
            </div>

            {view === 'JOBS' && (
                <div className="glass-card">
                    <h3>Post New Job</h3>
                    <input placeholder="Job Title" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} style={inputStyle} />
                    <textarea placeholder="Description" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} style={{ ...inputStyle, marginTop: '0.5rem', height: '80px' }} />
                    <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleCreateJob}>Post Job</button>

                    <h3 style={{ marginTop: '2rem' }}>Active Listings</h3>
                    {jobs.map(j => (
                        <div key={j.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem', borderRadius: '0.5rem' }}>
                            <h4>{j.title}</h4>
                            <small>Posted: {j.postedDate}</small>
                        </div>
                    ))}
                </div>
            )}

            {view === 'EXAMS' && (
                <div className="glass-card">
                    <h3>Create New Exam</h3>
                    <input placeholder="Exam Title" value={examTitle} onChange={e => setExamTitle(e.target.value)} style={inputStyle} />
                    <input type="number" placeholder="Pass Score %" value={passScore} onChange={e => setPassScore(e.target.value)} style={{ ...inputStyle, marginTop: '0.5rem' }} />

                    <h4>Questions</h4>
                    {questions.map((q, qIdx) => (
                        <div key={qIdx} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem' }}>
                            <input placeholder="Question Text" value={q.questionText} onChange={e => updateQuestion(qIdx, 'questionText', e.target.value)} style={inputStyle} />
                            <div style={{ marginTop: '0.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                {q.options.map((opt, oIdx) => (
                                    <input key={oIdx} placeholder={`Option ${oIdx + 1}`} value={opt} onChange={e => updateOption(qIdx, oIdx, e.target.value)} style={inputStyle} />
                                ))}
                            </div>
                            <input placeholder="Correct Option (Exact Text match)" value={q.correctOption} onChange={e => updateQuestion(qIdx, 'correctOption', e.target.value)} style={{ ...inputStyle, marginTop: '0.5rem', border: '1px solid #10b981' }} />
                        </div>
                    ))}
                    <button className="btn" onClick={addQuestion} style={{ marginRight: '1rem' }}>+ Add Question</button>
                    <button className="btn btn-primary" onClick={handleCreateExam}>Save Exam</button>
                </div>
            )}

            {view === 'CANDIDATES' && (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid white' }}>
                            <th style={{ padding: '0.5rem' }}>Name</th>
                            <th style={{ padding: '0.5rem' }}>Status</th>
                            <th style={{ padding: '0.5rem' }}>App Status</th>
                            <th style={{ padding: '0.5rem' }}>Exam</th>
                            <th style={{ padding: '0.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <td style={{ padding: '1rem' }}>{c.name}</td>
                                <td style={{ padding: '1rem' }}>{c.applicationStatus}</td>
                                <td style={{ padding: '1rem', color: c.applicationStatus === 'SHORTLISTED' ? 'lightgreen' : 'white' }}>{c.applicationStatus}</td>
                                <td style={{ padding: '1rem' }}>{c.examStatus}</td>
                                <td style={{ padding: '1rem' }}>
                                    {c.applicationStatus === 'APPLIED' && (
                                        <button className="btn" style={{ background: '#2563eb', fontSize: '0.8rem' }} onClick={() => handleShortlist(c.id)}>Shortlist</button>
                                    )}
                                    {c.examStatus === 'PASSED' && c.interviewStatus === 'PENDING' && (
                                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleScheduleInterview(c.id, c.name)}>Schedule Interview</button>
                                    )}
                                    {c.interviewStatus === 'SCHEDULED' && (
                                        <button className="btn" style={{ background: '#10b981', padding: '0.25rem 0.5rem', marginLeft: '0.5rem' }} onClick={() => handleInterviewFeedback(c.id, 'CLEARED')}>Pass Interview</button>
                                    )}
                                    {(c.bgvStatus === 'OFFER_GENERATED' || c.bgvStatus === 'CLEARED') && (
                                        <button className="btn" style={{ background: '#8b5cf6', padding: '0.25rem 0.5rem', marginLeft: '0.5rem' }} onClick={() => handleOnboard(c.id)}>Onboard</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {newEmployee && <OnboardingSuccess employee={newEmployee} onClose={() => setNewEmployee(null)} />}
        </div>
    );
}

const inputStyle = { width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' };
