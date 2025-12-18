package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.model.Course;
import dev.teamfive.tutoring.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CourseController {

    private final CourseRepository courseRepo;

    public CourseController(CourseRepository courseRepo) {
        this.courseRepo = courseRepo;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }


    @GetMapping("/bySubject/{subjectId}")
    public List<Course> getCoursesBySubject(@PathVariable Long subjectId) {
        return courseRepo.findBySubjectId(subjectId);
    }
}