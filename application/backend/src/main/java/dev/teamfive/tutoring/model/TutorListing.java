package dev.teamfive.tutoring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Each instance of a TutorListing represents a row in the db table 'tutor_listing'
@Entity
@Table(name = "tutor_listing")
public class TutorListing
{
    @Id
    // Tells JPA how to generate the listing_id if creating a new listing (GenerationType.IDENTITY means use db's auto-increment column)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "listing_id")
    private Long listingId;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "price_per_hour")
    private double pricePerHour;

    @Column(name = "available_time")
    private String availableTime;

    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "description")
    private String description;

    @Column(name = "video_sample_path")
    private String tutoringVideoSamplePath;

    // Boolean but stored in mysql as an int: 0 or 1
    @Column(name = "live")
    private int live;

    public Long getListingId()
    {
        return listingId;
    }

    public void setListingId(Long listingId)
    {
        this.listingId = listingId;
    }

    public Long getUserId()
    {
        return userId;
    }

    public void setUserId(Long userId)
    {
        this.userId = userId;
    }

    public Subject getSubject()
    {
        return subject;
    }

    public void setSubject(Subject subject)
    {
        this.subject = subject;
    }

    public Course getCourse()
    {
        return course;
    }

    public void setCourse(Course course)
    {
        this.course = course;
    }

    public double getPricePerHour()
    {
        return pricePerHour;
    }

    public void setPricePerHour(double pricePerHour)
    {
        this.pricePerHour = pricePerHour;
    }

    public String getAvailableTime()
    {
        return availableTime;
    }

    public void setAvailableTime(String availableTime)
    {
        this.availableTime = availableTime;
    }

    public String getResumePath()
    {
        return resumePath;
    }

    public void setResumePath(String resumePath)
    {
        this.resumePath = resumePath;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getTutoringVideoSamplePath()
    {
        return tutoringVideoSamplePath;
    }

    public void setTutoringVideoSamplePath(String tutoringVideoSamplePath)
    {
        this.tutoringVideoSamplePath = tutoringVideoSamplePath;
    }

    public int getLive()
    {
        return live;
    }

    public void setLive(int live)
    {
        this.live = live;
    }

    @Override
    public String toString()
    {
        return "TutorListing{" + "listingId=" + listingId + ", userId=" + userId + ", subject=" + subject + ", course=" + course + ", pricePerHour=" + pricePerHour + ", availableTime='" + availableTime + '\'' + ", resumePath='" + resumePath + '\'' + ", description='" + description + '\'' + ", tutoringVideoSamplePath='" + tutoringVideoSamplePath + '\'' + ", live=" + live + '}';
    }
}
