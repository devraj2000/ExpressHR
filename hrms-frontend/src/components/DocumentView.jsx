import React, { useState, useEffect } from 'react';
import { getDocuments, uploadDocument } from '../services/api';

export default function DocumentView({ employeeId }) {
    const [docs, setDocs] = useState([]);
    const [type, setType] = useState('AADHAAR');
    const [url, setUrl] = useState('');

    useEffect(() => {
        loadDocs();
    }, [employeeId]);

    const loadDocs = async () => {
        try {
            const res = await getDocuments(employeeId);
            setDocs(res.data);
        } catch (error) {
            console.error("Failed to load docs", error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await uploadDocument(employeeId, type, url);
            setUrl('');
            alert('Document Uploaded (Mock)!');
            loadDocs();
        } catch (error) {
            alert('Upload failed');
        }
    };

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h2>My Documents</h2>

            <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                <h3>Upload New Document</h3>
                <form onSubmit={handleUpload} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                    <div>
                        <label>Document Type</label>
                        <select
                            value={type} onChange={(e) => setType(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}
                        >
                            <option value="AADHAAR" style={{ color: 'black' }}>Aadhaar Card</option>
                            <option value="PAN" style={{ color: 'black' }}>PAN Card</option>
                            <option value="RESUME" style={{ color: 'black' }}>Resume</option>
                            <option value="OTHER" style={{ color: 'black' }}>Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Document URL (Mock)</label>
                        <input
                            placeholder="https://..."
                            value={url} onChange={(e) => setUrl(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
            </div>

            <h3>Uploaded Documents</h3>
            {docs.length === 0 ? <p>No documents uploaded.</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {docs.map(doc => (
                        <li key={doc.id} style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{doc.documentType}</span>
                            <a href={doc.documentUrl} target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>View</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
