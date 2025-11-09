package dev.teamfive.tutoring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "course")
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "subject_id")
    private Long subjectId;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "course_number")
    private String courseNumber;

    @Column(name = "description")
    private String description;

    public Long getCourseId()
    {
        return courseId;
    }

    public void setCourseId(Long courseId)
    {
        this.courseId = courseId;
    }

    public Long getSubjectId()
    {
        return subjectId;
    }

    public void setSubjectId(Long subjectId)
    {
        this.subjectId = subjectId;
    }

    public String getCourseName()
    {
        return courseName;
    }

    public void setCourseName(String courseName)
    {
        this.courseName = courseName;
    }

    public String getCourseNumber()
    {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber)
    {
        this.courseNumber = courseNumber;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    @Override
    public String toString()
    {
        return "Course{" + "courseId=" + courseId + ", subjectId=" + subjectId + ", courseName='" + courseName + '\'' + ", courseNumber='" + courseNumber + '\'' + ", description='" + description + '\'' + '}';
    }
}
