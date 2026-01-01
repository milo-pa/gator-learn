package dev.tutoring.controller;

import dev.tutoring.model.Subject;
import dev.tutoring.repository.SubjectRepository;
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