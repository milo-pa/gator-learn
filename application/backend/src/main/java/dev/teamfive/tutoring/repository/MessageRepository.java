package dev.teamfive.tutoring.repository;

import dev.teamfive.tutoring.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>
{
    @Query("""
        SELECT m
        FROM Message m
        WHERE m.account.userId = :userId
    """)
    List<Message> findMessagesSentToUser(@Param("userId") Long userId);

    @Query(""" 
        SELECT m
        FROM Message m
        JOIN m.listing l
        WHERE l.account.userId = :userId
    """)
    List<Message> findMessagesReceivedByUser(@Param("userId") Long userId);
}
