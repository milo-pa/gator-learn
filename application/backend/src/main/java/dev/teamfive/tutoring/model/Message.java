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
@Table(name = "messages")
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @Column(name = "listing_id")
    private String listingId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "message")
    private String message;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_and_time")
    private String dateAndTime;
}
