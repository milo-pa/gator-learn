package dev.teamfive.tutoring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Each instance of a TutorListing represents a row in the db table 'tutor_listing'
@Entity
@Table(name = "tutor_listing")
public class TutorListing
{
    // Automatically populate primary key from table row
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long listingId;

    private Long userId;

    // TODO: in m2 doc these two are just listed as 'subject' and 'course', implying they are names - however they are
    //  noted as foreign keys to subject and course tables, which should have subject and course ids as primary keys -
    //  so for these to be foreign keys to those tables they must actually be ids rather than subject/course names?
    private Long subjectId;
    private Long courseId;

    // TODO: how are prices stored in db?
    private double price;

    // TODO: this turns out to be a bit complicated
    //  I assume this is available times per week?
    //  - Could be a list of pairs of dates within a week, where 1st member of the pair is starting time and 2nd member
    //    is ending time (e.g. mon 2:30-4, weds 4-5)
    //    - So each availble time in a week could be millis since epoch stored in a tuple? e.g. List<Tuple<Long>> or something
    //  - If we want to be thorough we should also probably be storing a starting and ending date for what
    //    week this schedule starts and ends?
    //  On second thought mysql supports a limited amount of datatypes - e.g. there is no list type, but there
    //  are TIMESTAMP or DATETIME types (former taking locality into account), so I think we'll need this
    //  column in tutor_listing to be a foreign key to a new table of timestamp/datetimes within an (arbitrary?) week
    private Object availableTime;

    // TODO: datatype? a url to a pdf or something?
    private Object resume;

    private String description;

    // TODO: what datatype is this? something like a String url to a video within the db?
    //  How are videos retrieved and displayed from db
    private Object tutoringVideoSample;

    // TODO: not sure what this is or what datatype it is
    private Object live;

    @Override
    public String toString()
    {
        return "TutorListing{" + "listingId=" + listingId + ", userId=" + userId + ", subjectId=" + subjectId + ", courseId=" + courseId + ", price=" + price + ", availableTime=" + availableTime + ", resume=" + resume + ", description='" + description + '\'' + ", tutoringVideoSample=" + tutoringVideoSample + ", live=" + live + '}';
    }
}
