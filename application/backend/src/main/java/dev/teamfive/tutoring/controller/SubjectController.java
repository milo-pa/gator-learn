package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.model.Subject;
import dev.teamfive.tutoring.repository.SubjectRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SubjectController {

    private final SubjectRepository subjectRepo;

    public SubjectController(SubjectRepository subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectRepo.findAll();
    }
}