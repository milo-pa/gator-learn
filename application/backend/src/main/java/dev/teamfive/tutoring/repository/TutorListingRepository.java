package dev.teamfive.tutoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.teamfive.tutoring.model.TutorListing;

import java.util.List;

@Repository
public interface TutorListingRepository extends JpaRepository<TutorListing, Long>
{
    @Query("SELECT t FROM TutorListing t WHERE t.course LIKE CONCAT('%', :course, '%')")
    List<TutorListing> findByCourseContaining(@Param("course") String course);

    @Query("SELECT t FROM TutorListing t WHERE t.subject LIKE CONCAT('%', :subject, '%')")
    List<TutorListing> findBySubjectContaining(@Param("subject") String subject);
}