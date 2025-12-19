package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.service.UserAccountService;
import dev.teamfive.tutoring.model.UserAccount;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserAccountController
{
    private final UserAccountService userService;
    private final HttpSession httpSession;

    public UserAccountController(UserAccountService userService, HttpSession httpSession)
    {
        this.userService = userService;
        this.httpSession = httpSession;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserAccount user)
    {
        if (userService.getUserRepository().findByEmail(user.getEmail()).isPresent())
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        UserAccount created = userService.createAccount(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("userId", created.getUserId(), "email", created.getEmail(), "name", created.getName()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials)
    {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<UserAccount> userOpt = userService.authenticate(email, password);

        if (userOpt.isPresent())
        {
            // Set userId in httpSession
            httpSession.setAttribute("userId", userOpt.get().getUserId());

            return ResponseEntity.ok(Map.of("message", "Successfully logged in", "userId", userOpt.get()
                    .getUserId(), "name", userOpt.get().getName()));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Failed to login: Invalid email or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout()
    {
        Long userId = (Long) httpSession.getAttribute("userId");
        httpSession.invalidate();
        return ResponseEntity.ok(Map.of("message", "Successfully logged out of account with userId=" + userId));
    }

    // Protected endpoint example
    @GetMapping("/me")
    public ResponseEntity<?> me()
    {
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        UserAccount user = userService.getUserRepository().findById(userId).get();

        return ResponseEntity.ok(user);
    }

    /**
     * Update user profile photo path.
     * POST /api/user/update-photo
     * Body: { "photoPath": "/uploads/tutor_photo/photo_user1_abc123.jpg" }
     *
     * @param requestBody Map containing "photoPath"
     * @return Updated user account
     */
    @PutMapping("/update-photo")
    public ResponseEntity<?> updatePhoto(@RequestBody Map<String, String> requestBody)
    {
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        Optional<UserAccount> userOpt = userService.getUserRepository().findById(userId);
        if (userOpt.isEmpty())
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserAccount user = userOpt.get();
        String photoPath = requestBody.get("photoPath");
        user.setPhotoPath(photoPath);
        UserAccount updated = userService.getUserRepository().save(user);

        return ResponseEntity.ok(updated);
    }
}
