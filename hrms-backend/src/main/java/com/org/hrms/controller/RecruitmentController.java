package com.org.hrms.controller;

import com.org.hrms.model.*;
import com.org.hrms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recruitment")
@CrossOrigin(origins = "http://localhost:8520")
@RequiredArgsConstructor
public class RecruitmentController {

    private final ExamRepository examRepository;
    private final CandidateRepository candidateRepository;
    private final InterviewRepository interviewRepository;
    private final JobRepository jobRepository;
    private final BackgroundVerificationRepository bgvRepository;

    // --- Job Management ---

    @PostMapping("/jobs")
    public JobPosting createJob(@RequestBody JobPosting job) {
        job.setPostedDate(java.time.LocalDate.now());
        job.setStatus("OPEN");
        return jobRepository.save(job);
    }

    @GetMapping("/jobs")
    public List<JobPosting> getAllJobs() {
        return jobRepository.findByStatus("OPEN");
    }

    // --- Candidate Management ---

    @PostMapping("/candidates/apply")
    public Candidate applyCandidate(@RequestBody Candidate candidate) {
        candidate.setApplicationStatus("APPLIED");
        candidate.setExamStatus("PENDING");
        candidate.setInterviewStatus("PENDING");
        candidate.setBgvStatus("PENDING");
        return candidateRepository.save(candidate);
    }

    @GetMapping("/candidates")
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @GetMapping("/candidates/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidateRepository.findById(id).orElseThrow();
    }

    @PutMapping("/candidates/{id}/shortlist")
    public Candidate shortlistCandidate(@PathVariable Long id) {
        Candidate c = candidateRepository.findById(id).orElseThrow();
        c.setApplicationStatus("SHORTLISTED");
        // Simulation: Send Email "You are shortlisted! Please take the exam."
        System.out.println("Email to " + c.getEmail() + ": Shortlisted. Take Exam.");
        return candidateRepository.save(c);
    }

    // --- Exam process ---

    @PostMapping("/exams")
    public Exam createExam(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }

    @GetMapping("/exams")
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @GetMapping("/exams/{examId}/take")
    public Exam getExamForCandidate(@PathVariable Long examId) {
        return examRepository.findById(examId).orElseThrow();
    }

    @PostMapping("/exams/{examId}/submit")
    public Candidate submitExam(@PathVariable Long examId, @RequestParam Long candidateId,
            @RequestBody Map<Long, String> answers) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();
        Exam exam = examRepository.findById(examId).orElseThrow();

        int correctCount = 0;
        for (Question q : exam.getQuestions()) {
            String givenAns = answers.get(q.getId());
            if (givenAns != null && givenAns.equals(q.getCorrectOption())) {
                correctCount++;
            }
        }

        int score = (correctCount * 100) / exam.getQuestions().size();
        candidate.setExamScore(score);
        candidate.setExamStatus(score >= exam.getPassScore() ? "PASSED" : "FAILED");
        candidate.setAssignedExamId(examId);

        return candidateRepository.save(candidate);
    }

    // --- Interview Management ---

    @PostMapping("/interviews/schedule")
    public Interview scheduleInterview(@RequestParam Long candidateId, @RequestBody Interview interview) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();

        if (!"PASSED".equals(candidate.getExamStatus())) {
            throw new RuntimeException("Candidate has not passed the exam yet.");
        }

        interview.setCandidateId(candidateId);
        interview.setCandidateName(candidate.getName());
        interview.setStatus("SCHEDULED");

        candidate.setInterviewStatus("SCHEDULED");
        candidateRepository.save(candidate);

        // Email Simulation
        System.out.println(
                "Email to " + candidate.getEmail() + ": Interview Scheduled at " + interview.getScheduledTime());

        return interviewRepository.save(interview);
    }

    @PostMapping("/interviews/feedback")
    public Interview updateInterviewResult(@RequestParam Long interviewId, @RequestParam String status,
            @RequestParam String feedback) {
        Interview interview = interviewRepository.findById(interviewId).orElseThrow();
        interview.setStatus(status); // CLEARED or REJECTED
        interview.setFeedback(feedback);

        Candidate candidate = candidateRepository.findById(interview.getCandidateId()).orElseThrow();
        candidate.setInterviewStatus(status);

        if ("CLEARED".equals(status)) {
            // Initiate BGV automatically or let candidate do it?
            // Requirement says: "if passed ... prompted to BGV screen"
            // So we just update status to allow them to proceed
            candidate.setBgvStatus("PENDING_SUBMISSION");
        }

        candidateRepository.save(candidate);

        System.out.println("Sending email to " + candidate.getEmail() + ": Your interview result is " + status);

        return interviewRepository.save(interview);
    }
}
