package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.model.Message;
import dev.teamfive.tutoring.repository.MessageRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * This class defines the API endpoint for managing messages.
 */
@RestController
@RequestMapping("api/message")
public class MessageController
{
    private final MessageRepository repository;
    private final HttpSession session;

    public MessageController(MessageRepository repository, HttpSession session)
    {
        this.repository = repository;
        this.session = session;
    }

    @GetMapping("/{id}")
    public Message getMessageById(@PathVariable Long id)
    {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/sent-to/{userId}")
    public ResponseEntity<?> getSentMessagesForUser(@PathVariable Long userId)
    {
        Long sessionUserId = (Long) session.getAttribute("userId");

        if (sessionUserId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to retrieve messages");
        }
        // Prevent retrieving other user's message data
        if (!sessionUserId.equals(userId))
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Message> messages = repository.findMessagesSentToUser(userId);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/received-by/{userId}")
    public ResponseEntity<?> getReceivedMessagesForUser(@PathVariable Long userId)
    {
        Long sessionUserId = (Long) session.getAttribute("userId");

        if (sessionUserId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to retrieve messages");
        }
        // Prevent retrieving other user's message data
        if (!sessionUserId.equals(userId))
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<Message> messages = repository.findMessagesReceivedByUser(userId);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMessage(@RequestBody Message message)
    {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to create a message");
        }

        Message saved = repository.save(message);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id)
    {
        try
        {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        catch (EmptyResultDataAccessException e)
        {
            return ResponseEntity.notFound().build();
        }
    }
}
