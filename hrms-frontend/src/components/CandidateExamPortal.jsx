import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';

export default function CandidateExamPortal() {
    const [step, setStep] = useState('LOGIN'); // LOGIN, EXAM, RESULT
    const [candidateId, setCandidateId] = useState(null);
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const videoRef = useRef(null);

    // Camera Init
    const startProctoring = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            alert("Camera Access Required for Proctoring!");
        }
    };

    const handleLogin = async () => {
        // Create candidate record first
        try {
            const res = await api.post('/recruitment/candidates/apply', { name, email });
            setCandidateId(res.data.id);

            // Fetch first available exam for demo (Ideally assigned)
            const examsRes = await api.get('/recruitment/exams');
            if (examsRes.data.length > 0) {
                setExam(examsRes.data[0]);
                startProctoring();
                document.documentElement.requestFullscreen().catch((e) => console.log(e));
                setStep('EXAM');
            } else {
                alert("No exams available currently.");
            }
        } catch (e) {
            console.error(e);
            alert("Login Failed");
        }
    };

    const handleSubmitExam = async () => {
        try {
            const res = await api.post(`/recruitment/exams/${exam.id}/submit`, answers, { params: { candidateId } });
            setResult(res.data);
            setStep('RESULT');
            document.exitFullscreen().catch(e => console.log(e));
        } catch (e) {
            alert("Submission Failed");
        }
    };

    if (step === 'LOGIN') return (
        <div style={containerStyle}>
            <h1>Candidate Portal</h1>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, marginTop: '1rem' }} />
            <button className="btn btn-primary" onClick={handleLogin} style={{ marginTop: '2rem', width: '100%' }}>Start Exam</button>
        </div>
    );

    if (step === 'RESULT') return (
        <div style={{ ...containerStyle, textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: result.examStatus === 'PASSED' ? '#34d399' : '#f87171' }}>
                {result.examStatus}
            </h1>
            <h2>Score: {result.examScore}%</h2>
            <p>
                {result.examStatus === 'PASSED'
                    ? "Congratulations! HR will contact you shortly for the interview."
                    : "Unfortunately, you did not pass. Best of luck next time."}
            </p>
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#1e293b', color: 'white' }}>
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <h2>{exam.title}</h2>
                <div style={{ marginTop: '2rem' }}>
                    {exam.questions.map((q) => (
                        <div key={q.id} style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '1rem' }}>
                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{q.questionText}</p>
                            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
                                {q.options.map(opt => (
                                    <label key={opt} style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', background: answers[q.id] === opt ? 'rgba(96, 165, 250, 0.2)' : 'transparent', borderRadius: '0.5rem', cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            checked={answers[q.id] === opt}
                                            onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={handleSubmitExam} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>Submit Exam</button>
            </div>

            <div style={{ width: '300px', background: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem', borderLeft: '1px solid #333' }}>
                <h3 style={{ color: 'red', marginBottom: '1rem' }}>● PROCTORING ACTIVE</h3>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '0.5rem', border: '2px solid red' }} />
                <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
                    Your video feed is being monitored.<br />
                    Do not exit Fullscreen.
                </p>
            </div>
        </div>
    );
}

const containerStyle = {
    maxWidth: '500px',
    margin: '10vh auto',
    padding: '3rem',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '1rem',
    backdropFilter: 'blur(10px)',
    color: 'white'
};
const inputStyle = { width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '0.5rem', border: 'none' };
