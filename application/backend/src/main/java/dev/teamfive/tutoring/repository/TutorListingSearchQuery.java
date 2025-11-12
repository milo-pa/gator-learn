package dev.teamfive.tutoring.repository;

abstract class TutorListingSearchQuery
{
    static final String QUERY = "SELECT t FROM TutorListing t " +
            Clauses.JOIN_ACCOUNT + " " +
            Clauses.JOIN_SUBJECT + " " +
            Clauses.JOIN_COURSE + " " +
            "WHERE " + Clauses.QUERY_LISTING_ID + " " +
            "AND " + Clauses.QUERY_LISTING_DESC + " " +
            "AND " + Clauses.QUERY_ACCOUNT_NAME + " " +
            "AND " + Clauses.QUERY_SUBJECT_NAME + " " +
            "AND " + Clauses.QUERY_COURSE_NAME + " " +
            "AND " + Clauses.QUERY_COURSE_NUMBER;

    static final class Clauses
    {
        static final String JOIN_ACCOUNT = "JOIN t.account a";
        static final String JOIN_SUBJECT = "JOIN t.subject s";
        static final String JOIN_COURSE = "JOIN t.course c";

        static final String QUERY_LISTING_ID = "(:listingId IS NULL OR t.listingId = :listingId)";
        static final String QUERY_LISTING_DESC = "(:listingDescSubstring IS NULL OR t.description LIKE CONCAT('%', :listingDescSubstring, '%'))";

        static final String QUERY_ACCOUNT_NAME = "(:accountNameSubstring IS NULL OR a.name LIKE CONCAT('%', :accountNameSubstring, '%'))";

        static final String QUERY_SUBJECT_NAME = "(:subjectNameSubstring IS NULL OR s.subjectName LIKE CONCAT('%', :subjectNameSubstring, '%'))";

        static final String QUERY_COURSE_NAME = "(:courseNameSubstring IS NULL OR c.courseName LIKE CONCAT('%', :courseNameSubstring, '%'))";
        static final String QUERY_COURSE_NUMBER = "(:courseNumberSubstring IS NULL OR c.courseNumber LIKE CONCAT('%', :courseNumberSubstring, '%'))";
    }
}
