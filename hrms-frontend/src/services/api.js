import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2580/api',
});

export const getEmployees = () => api.get('/employees');
export const getEmployee = (id) => api.get(`/employees/${id}`); // Assuming existing endpoint or I'll add it
export const updateEmployee = (id, data) => api.put(`/employees/${id}`, data);
export const createEmployee = (data) => api.post('/employees', data);

export const getReviewTasks = (managerId) => api.get(`/reviews?managerId=${managerId}`);
export const reviewTask = (id, decision, reason) => api.post(`/reviews/${id}`, { decision, reason });

// Leave
export const applyLeave = (data) => api.post('/leaves/apply', null, { params: data });
export const approveLeave = (id) => api.post(`/leaves/${id}/approve`);
export const cancelLeave = (id) => api.put(`/leaves/${id}/cancel`);

// Payroll
export const getPayslipHistory = (employeeId) => api.get('/payroll/history', { params: { employeeId } });

// General (Holidays, Policies, Docs)
export const getHolidays = () => api.get('/general/holidays');
export const getPolicies = (category) => api.get('/general/policies', { params: { category } });
export const getDocuments = (employeeId) => api.get('/general/documents', { params: { employeeId } });
export const uploadDocument = (employeeId, type, url) => api.post('/general/documents', null, { params: { employeeId, type, url } });

// BGV
export const initiateBgv = (employeeId, provider) => api.post('/bgv/initiate', null, { params: { employeeId, provider } });
export const getBgvStatus = (employeeId) => api.get('/bgv/status', { params: { employeeId } });
export const uploadBgvDocs = (params) => api.post('/bgv/upload-docs', null, { params });
export const validateBgv = (employeeId, status, remarks) => api.put('/bgv/validate', null, { params: { employeeId, status, remarks } });
export const generateOffer = (employeeId) => api.post('/bgv/generate-offer', null, { params: { employeeId } });

// Recruitment & Interview
export const createExam = (data) => api.post('/recruitment/exams', data);
export const getExams = () => api.get('/recruitment/exams');
export const getCandidates = () => api.get('/recruitment/candidates');
export const getCandidate = (id) => api.get(`/recruitment/candidates/${id}`);
export const applyCandidate = (data) => api.post('/recruitment/candidates/apply', data);
export const submitExam = (examId, answers, candidateId) => api.post(`/recruitment/exams/${examId}/submit`, answers, { params: { candidateId } });
export const scheduleInterview = (candidateId, data) => api.post('/recruitment/interviews/schedule', data, { params: { candidateId } });
export const shortlistCandidate = (id) => api.put(`/recruitment/candidates/${id}/shortlist`);
export const getInterviews = (candidateId) => api.get('/interviews'); // Uses existing InterviewController

export default api;
