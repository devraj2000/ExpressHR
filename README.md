# 🚀 ExpressHR

**ExpressHR** is a next-generation **Human Resource Management System (HRMS)** designed to unify the Candidate ⮕ Employee journey into a single, seamless, and engaging experience.

> *"One Portal, Two Personas. From Applicant to Employee in one magic moment."*

---

## 🌟 Key Features

### 1. 📢 Smart Job Board
- Public-facing career page with rich job descriptions.
- **One-Click Apply**: Easy application form capturing experience, skills, and resume.
- **Live Status Tracking**: Candidates see real-time updates (Shortlisted, Test Initiated, etc.).

### 2. 🧩 End-to-End Recruitment Pipeline
- **HR Dashboard**: Kanban-style view of all candidates.
- **Workflow Stages**:
    1.  **Screening**: Resume & Skill matching.
    2.  **Online Test**: Integrated exam portal with auto-grading.
    3.  **Interview**: Scheduling and feedback management.
    4.  **BGV (Background Verification)**: Document upload and verification portal.
    5.  **Offer Management**: One-click offer generation.

### 3. ✨ The "Magic Moment" Onboarding
- **Seamless Conversion**: Convert a hired Candidate into an Employee with a single click.
- **Celebratory UI**: Experience the "Welcome to the Team" animation.
- **Auto-Provisioning**: Automatically generates Employee ID and access credentials.

### 4. 👥 Role-Based Portals
- **HR View**: Full control over recruitment, BGV, and employee data.
- **Manager View**: Team dashboards and approvals.
- **Employee View**: Self-service portal for profile and leave management.
- **Candidate View**: Engaging progress tracker.

---

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 3, Spring Data JPA
- **Frontend**: React 18, React Router v6, Axios
- **Database**: H2 (Dev) / MySQL (Prod)
- **Styling**: Modern CSS3, Glassmorphism UI, Dark Mode Aesthetics

---

## 🚀 Getting Started

### Prerequisites
- Java 17+ installed
- Node.js 16+ installed
- Maven 3.6+

### 1. Backend Setup
```bash
cd hrms-backend
mvn spring-boot:run
```
*Server will start on `http://localhost:8080`*

### 2. Frontend Setup
```bash
cd hrms-frontend
npm install
npm run dev
```
*Client will start on `http://localhost:5173` (or similar)*

---

## 🗺️ Application Flow (The "Story")

1.  **Apply**: Candidate finds a job on the **Job Board** and applies.
2.  **Dashboard**: Candidate logs in to track status: *"Application Submitted"*.
3.  **Shortlist**: HR reviews application and clicks **Shortlist**.
4.  **Exam**: Candidate sees *"Test Initiated"*, takes the online exam, and passes.
5.  **Interview**: HR schedules an interview; Candidate sees details on dashboard.
6.  **Offer**: After clearing Interview & BGV, HR generates an Offer.
7.  **Onboard**: HR clicks **"Onboard"** -> 🎉 **MAGIC MOMENT** -> Candidate becomes an **Employee**.
8.  **Login**: User logs in as Employee to see the internal HRMS view.

---

## 🎨 Design Philosophy
- **Zero Redundancy**: Data entered during application is reused for employee profile.
- **Fun & Professional**: Premium dark aesthetics with micro-interactions.
- **Transparency**: Users always know "What's Next?".

---

*Built with ❤️ for the future of HR tech.*
