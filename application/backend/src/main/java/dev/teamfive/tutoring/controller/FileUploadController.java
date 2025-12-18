/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Team 05
 * Created: 2025
 * Description: Controller for handling file upload endpoints (resumes, videos, photos).
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
package dev.teamfive.tutoring.controller;

import dev.teamfive.tutoring.service.FileUploadService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController
{
    private final FileUploadService fileUploadService;
    private final HttpSession httpSession;

    public FileUploadController(FileUploadService fileUploadService, HttpSession httpSession)
    {
        this.fileUploadService = fileUploadService;
        this.httpSession = httpSession;
    }

    /**
     * Upload endpoint for resume files.
     * POST /api/upload/resume
     *
     * @param file The resume file to upload
     * @return ResponseEntity with the file path on success, or error message on failure
     */
    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file)
    {
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "You must be logged in to upload a resume"));
        }

        try
        {
            String filePath = fileUploadService.saveResume(file, userId);
            Map<String, String> response = new HashMap<>();
            response.put("path", filePath);
            response.put("message", "Resume uploaded successfully");
            return ResponseEntity.ok(response);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
        catch (IOException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save resume file: " + e.getMessage()));
        }
    }

    /**
     * Upload endpoint for video files.
     * POST /api/upload/video
     *
     * @param file The video file to upload
     * @return ResponseEntity with the file path on success, or error message on failure
     */
    @PostMapping("/video")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file)
    {
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "You must be logged in to upload a video"));
        }

        try
        {
            String filePath = fileUploadService.saveVideo(file, userId);
            Map<String, String> response = new HashMap<>();
            response.put("path", filePath);
            response.put("message", "Video uploaded successfully");
            return ResponseEntity.ok(response);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
        catch (IOException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save video file: " + e.getMessage()));
        }
    }

    /**
     * Upload endpoint for tutor photo files.
     * POST /api/upload/photo
     *
     * @param file The photo file to upload
     * @return ResponseEntity with the file path on success, or error message on failure
     */
    @PostMapping("/photo")
    public ResponseEntity<?> uploadPhoto(@RequestParam("file") MultipartFile file)
    {
        Long userId = (Long) httpSession.getAttribute("userId");

        if (userId == null)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "You must be logged in to upload a photo"));
        }

        try
        {
            String filePath = fileUploadService.savePhoto(file, userId);
            Map<String, String> response = new HashMap<>();
            response.put("path", filePath);
            response.put("message", "Photo uploaded successfully");
            return ResponseEntity.ok(response);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
        catch (IOException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to save photo file: " + e.getMessage()));
        }
    }
}
