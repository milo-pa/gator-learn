package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.model.UserRegistrationForm;
import dev.teamfive.tutoring.service.FileStorageService;
import dev.teamfive.tutoring.service.UserAccountService;
import dev.teamfive.tutoring.model.UserAccount;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserAccountController
{
    private final UserAccountService userService;
    private final HttpSession httpSession;
    private final FileStorageService fileStorageService;

    public UserAccountController(UserAccountService userService, HttpSession httpSession, FileStorageService fileStorageService)
    {
        this.userService = userService;
        this.httpSession = httpSession;
        this.fileStorageService = fileStorageService;
    }


    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(@ModelAttribute UserRegistrationForm form) throws IOException
    {
        System.out.println(form);
        // Validate input etc
        if (form.getEmail() == null || form.getPassword() == null)
        {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        // Create entity
        UserAccount user = new UserAccount();
        user.setName(form.getName());
        user.setEmail(form.getEmail());
        user.setPassword(userService.getPasswordEncoder().encode(form.getPassword()));
        user.setDescription(form.getDescription());
        user.setPronouns(form.getPronouns());

        // Handle photo
        String photoPath = fileStorageService.store(form.getPhotoFile(), user.getName());
        user.setPhotoPath(photoPath);

        System.out.println(user);
        System.out.println(form.getPhotoFile() + " " + photoPath);

        // Save user
        userService.getUserRepository().save(user);

        return ResponseEntity.ok("User registered");
    }

    //    @PostMapping("/register")
    //    public ResponseEntity<?> register(@RequestBody UserAccount user)
    //    {
    //        System.out.println("REGISTER: " + user);
    //
    //        if (userService.getUserRepository().findByEmail(user.getEmail()).isPresent())
    //        {
    //            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
    //        }
    //
    //        UserAccount created = userService.createAccount(user);
    //
    //        return ResponseEntity.status(HttpStatus.CREATED)
    //                .body(Map.of("userId", created.getUserId(), "email", created.getEmail(), "name", created.getName()));
    //    }

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
}
