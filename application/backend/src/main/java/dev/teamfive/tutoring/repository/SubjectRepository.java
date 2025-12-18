package dev.teamfive.tutoring.repository;

import dev.teamfive.tutoring.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
}