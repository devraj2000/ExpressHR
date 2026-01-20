import React, { useState, useEffect } from 'react';
import { getPayslipHistory } from '../services/api';

export default function PayslipView({ employeeId = 1 }) {
    const [payslips, setPayslips] = useState([]);

    useEffect(() => {
        loadPayslips();
    }, [employeeId]);

    const loadPayslips = async () => {
        try {
            const res = await getPayslipHistory(employeeId);
            setPayslips(res.data);
        } catch (error) {
            console.error("Failed to load payslips", error);
        }
    };

    const handleDownload = (url) => {
        // In real app, this would trigger a download
        alert(`Downloading payslip from: ${url}`);
    };

    return (
        <div className="glass-card" style={{ marginTop: '2rem' }}>
            <h2>My Payslips</h2>
            {payslips.length === 0 ? (
                <p>No payslips found.</p>
            ) : (
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '1rem' }}>Month</th>
                            <th style={{ padding: '1rem' }}>Net Salary</th>
                            <th style={{ padding: '1rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payslips.map((slip) => (
                            <tr key={slip.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem' }}>{slip.month}</td>
                                <td style={{ padding: '1rem' }}>${slip.netSalary}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        className="btn"
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
                                        onClick={() => handleDownload(slip.pdfUrl)}
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
