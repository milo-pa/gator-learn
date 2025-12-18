package dev.teamfive.tutoring.repository;

import dev.teamfive.tutoring.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findBySubjectId(Long subjectId);
}