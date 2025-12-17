package dev.teamfive.tutoring.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    // This (or rather, the listing's user) is the message receiver: incoming
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id")
    private TutorListing listing;

    // This is the message sender: outgoing
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserAccount account;

    @Column(name = "message")
    private String message;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_and_time")
    private String dateAndTime;

    public Long getMessageId()
    {
        return messageId;
    }

    public void setMessageId(Long messageId)
    {
        this.messageId = messageId;
    }

    public TutorListing getListing()
    {
        return listing;
    }

    public void setListing(TutorListing listing)
    {
        this.listing = listing;
    }

    public UserAccount getAccount()
    {
        return account;
    }

    public void setAccount(UserAccount account)
    {
        this.account = account;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public String getPhoneNumber()
    {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber)
    {
        this.phoneNumber = phoneNumber;
    }

    public String getDateAndTime()
    {
        return dateAndTime;
    }

    public void setDateAndTime(String dateAndTime)
    {
        this.dateAndTime = dateAndTime;
    }
}
