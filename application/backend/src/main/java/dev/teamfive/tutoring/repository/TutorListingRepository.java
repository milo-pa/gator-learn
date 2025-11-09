package dev.teamfive.tutoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.teamfive.tutoring.model.TutorListing;

import java.util.List;

/**
 * An interface defining ways to interact with TutorListing entities from the `tutor_listing` database table.
 */
@Repository
public interface TutorListingRepository extends JpaRepository<TutorListing, Long>
{
    /**
     * Retrieves all {@link TutorListing} entities associated with courses whose names contain the given substring
     * <p>
     * A row of the tutor_listing table does not contain a course name, so it's required to form an association between
     * {@code TutorListing} and {@code Course} entities (Using @JoinColumn annotations), and then for this query to perform
     * a JOIN between {@code TutorListing} and its related {@code Course} entity.
     *
     * @param courseSubstring A substring to search for within the course name.
     *                       E.g. "Data" will return both listings for "Data Structures" and "Data Analysis"
     * @return A list of {@link TutorListing} entities (empty list if no matches for courseSubstring)
     */
    @Query("SELECT t FROM TutorListing t JOIN t.course c WHERE c.courseName LIKE CONCAT('%', :courseSubstring, '%')")
    List<TutorListing> findByCourseContaining(@Param("courseSubstring") String courseSubstring);

    /**
     * Retrieves all {@link TutorListing} entities associated with subjects whose names contain the given substring
     * <p>
     * A row of the tutor_listing table does not contain a subject name, so it's required to form an association between
     * {@code TutorListing} and {@code Subject} entities (Using @JoinColumn annotations), and then for this query to perform
     * a JOIN between {@code TutorListing} and its related {@code Subject} entity.
     *
     * @param subjectSubstring A substring to search for within the subject name.
     *                       E.g. "Science" will return both listings for "Computer Science" and "Political Science"
     * @return A list of {@link TutorListing} entities (empty list if no matches for subjectSubstring)
     */
    @Query("SELECT t FROM TutorListing t JOIN t.subject s WHERE s.subjectName LIKE CONCAT('%', :subjectSubstring, '%')")
    List<TutorListing> findBySubjectContaining(@Param("subjectSubstring") String subjectSubstring);
}