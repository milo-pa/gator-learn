/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Team 05
 * Created: 2025
 * Description: Service for handling file uploads (resumes, videos, photos) to the filesystem.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
package dev.tutoring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadService
{
    // Base upload directory - configured in application.properties
    @Value("${file.upload.directory:/var/www/tutoringapp/uploads}")
    private String uploadDirectory;

    // Allowed MIME types for resumes (PDF and images)
    private static final List<String> ALLOWED_RESUME_TYPES = Arrays.asList(
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    // Allowed MIME types for videos
    private static final List<String> ALLOWED_VIDEO_TYPES = Arrays.asList(
            "video/mp4",
            "video/webm"
    );

    // Allowed MIME types for photos
    private static final List<String> ALLOWED_PHOTO_TYPES = Arrays.asList(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    // Max file sizes (in bytes)
    private static final long MAX_RESUME_SIZE = 10 * 1024 * 1024; // 10MB
    private static final long MAX_VIDEO_SIZE = 50 * 1024 * 1024;  // 50MB
    private static final long MAX_PHOTO_SIZE = 5 * 1024 * 1024;   // 5MB

    /**
     * Saves a resume file to the filesystem.
     *
     * @param file The resume file to save
     * @param userId The user ID (for unique filename generation)
     * @return The relative path where the file was saved (e.g., "/uploads/resumes/resume_user1_abc123.pdf")
     * @throws IllegalArgumentException if file validation fails
     * @throws IOException if file cannot be saved
     */
    public String saveResume(MultipartFile file, Long userId) throws IOException
    {
        validateResumeFile(file);
        return saveFile(file, "resumes", userId, "resume");
    }

    /**
     * Saves a video file to the filesystem.
     *
     * @param file The video file to save
     * @param userId The user ID (for unique filename generation)
     * @return The relative path where the file was saved (e.g., "/uploads/videos/video_user1_abc123.mp4")
     * @throws IllegalArgumentException if file validation fails
     * @throws IOException if file cannot be saved
     */
    public String saveVideo(MultipartFile file, Long userId) throws IOException
    {
        validateVideoFile(file);
        return saveFile(file, "videos", userId, "video");
    }

    /**
     * Saves a photo file to the filesystem.
     *
     * @param file The photo file to save
     * @param userId The user ID (for unique filename generation)
     * @return The relative path where the file was saved (e.g., "/uploads/tutor_photo/photo_user1_abc123.jpg")
     * @throws IllegalArgumentException if file validation fails
     * @throws IOException if file cannot be saved
     */
    public String savePhoto(MultipartFile file, Long userId) throws IOException
    {
        validatePhotoFile(file);
        return saveFile(file, "tutor_photo", userId, "photo");
    }

    /**
     * Generic method to save a file to the filesystem.
     *
     * @param file The file to save
     * @param subdirectory The subdirectory (resumes, videos, or tutor_photo)
     * @param userId The user ID
     * @param prefix The filename prefix (resume, video, or photo)
     * @return The relative path where the file was saved
     * @throws IOException if file cannot be saved
     */
    private String saveFile(MultipartFile file, String subdirectory, Long userId, String prefix) throws IOException
    {
        // Create the target directory path
        Path uploadPath = Paths.get(uploadDirectory, subdirectory);

        // Create directory if it doesn't exist
        if (!Files.exists(uploadPath))
        {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename: prefix_user{userId}_{uuid}.{extension}
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String uniqueFilename = String.format("%s_user%d_%s%s", prefix, userId, UUID.randomUUID().toString(), extension);

        // Create the full file path
        Path filePath = uploadPath.resolve(uniqueFilename);

        // Save the file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative path starting with /uploads/ (matching Nginx config)
        return String.format("/uploads/%s/%s", subdirectory, uniqueFilename);
    }

    /**
     * Validates a resume file (type and size).
     *
     * @param file The file to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateResumeFile(MultipartFile file)
    {
        if (file == null || file.isEmpty())
        {
            throw new IllegalArgumentException("Resume file cannot be empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_RESUME_TYPES.contains(contentType))
        {
            throw new IllegalArgumentException(
                    String.format("Invalid file type for resume. Allowed types: %s", ALLOWED_RESUME_TYPES)
            );
        }

        if (file.getSize() > MAX_RESUME_SIZE)
        {
            throw new IllegalArgumentException(
                    String.format("Resume file size exceeds maximum allowed size of %d MB", MAX_RESUME_SIZE / (1024 * 1024))
            );
        }
    }

    /**
     * Validates a video file (type and size).
     *
     * @param file The file to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateVideoFile(MultipartFile file)
    {
        if (file == null || file.isEmpty())
        {
            throw new IllegalArgumentException("Video file cannot be empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_VIDEO_TYPES.contains(contentType))
        {
            throw new IllegalArgumentException(
                    String.format("Invalid file type for video. Allowed types: %s", ALLOWED_VIDEO_TYPES)
            );
        }

        if (file.getSize() > MAX_VIDEO_SIZE)
        {
            throw new IllegalArgumentException(
                    String.format("Video file size exceeds maximum allowed size of %d MB", MAX_VIDEO_SIZE / (1024 * 1024))
            );
        }
    }

    /**
     * Validates a photo file (type and size).
     *
     * @param file The file to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validatePhotoFile(MultipartFile file)
    {
        if (file == null || file.isEmpty())
        {
            throw new IllegalArgumentException("Photo file cannot be empty");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_PHOTO_TYPES.contains(contentType))
        {
            throw new IllegalArgumentException(
                    String.format("Invalid file type for photo. Allowed types: %s", ALLOWED_PHOTO_TYPES)
            );
        }

        if (file.getSize() > MAX_PHOTO_SIZE)
        {
            throw new IllegalArgumentException(
                    String.format("Photo file size exceeds maximum allowed size of %d MB", MAX_PHOTO_SIZE / (1024 * 1024))
            );
        }
    }

    /**
     * Extracts the file extension from a filename.
     *
     * @param filename The filename
     * @return The file extension including the dot (e.g., ".pdf", ".jpg")
     */
    private String getFileExtension(String filename)
    {
        if (filename == null || filename.lastIndexOf('.') == -1)
        {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.'));
    }
}
