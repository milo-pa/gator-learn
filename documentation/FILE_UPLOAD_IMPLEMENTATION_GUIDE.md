# File Upload Implementation Guide

## Overview
This guide explains the theory and architecture for implementing file uploads (resumes, videos, and tutor photos) in the tutoring application. Files are stored on the EC2 server's filesystem and their paths are saved in the database.

---

##  Architecture Overview

### System Components

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐         ┌──────────────┐
│   Browser   │────────▶│   Frontend   │────────▶│   Backend   │────────▶│  FileSystem  │
│  (React)    │         │   (React)    │         │ (SpringBoot)│         │  (EC2/Nginx) │
└─────────────┘         └──────────────┘         └─────────────┘         └──────────────┘
                              │                          │                        │
                              │                          │                        │
                              ▼                          ▼                        ▼
                        ┌──────────────┐         ┌─────────────┐         ┌──────────────┐
                        │   HTTP POST  │         │   MySQL DB  │         │  /var/www/   │
                        │ Multipart/   │         │  Store Paths│         │ tutoringapp/ │
                        │ Form-Data    │         │             │         │   uploads/   │
                        └──────────────┘         └─────────────┘         └──────────────┘
```

---

## 📋 Complete Flow Diagram

### File Upload Process Flow

```
1. USER SELECTS FILE
   └─> Frontend form: <input type="file">
       └─> File object stored in React state

2. USER SUBMITS FORM
   └─> Frontend creates FormData object
       └─> Appends file(s) to FormData
       └─> Sends POST request to Backend API
           └─> Headers: Content-Type: multipart/form-data

3. BACKEND RECEIVES REQUEST
   └─> FileUploadController endpoint receives MultipartFile
       └─> Validates file (type, size)
       └─> Generates unique filename (prevents overwrites)
       └─> Determines target directory based on file type:
           ├─> Resume → /var/www/tutoringapp/uploads/resumes/
           ├─> Video  → /var/www/tutoringapp/uploads/videos/
           └─> Photo  → /var/www/tutoringapp/uploads/tutor_photo/

4. FILE SAVED TO DISK
   └─> Backend writes file to filesystem
       └─> Creates subdirectory if it doesn't exist
       └─> Saves file with generated filename
       └─> Returns relative path (e.g., "/uploads/resumes/filename.pdf")

5. PATH STORED IN DATABASE
   └─> Backend updates appropriate table:
       ├─> Resume/Video → tutor_listing table
       │   ├─> resume_path column
       │   └─> video_sample_path column
       └─> Photo → user_account table
           └─> photo column

6. RESPONSE TO FRONTEND
   └─> Backend returns success with stored path
       └─> Frontend can display uploaded file or proceed with form submission

7. FILE SERVED BY NGINX
   └─> When file is requested via URL (e.g., /uploads/resumes/file.pdf)
       └─> Nginx serves file directly from filesystem
           └─> No backend involvement needed for file retrieval
```

---

## 🗂️ File Storage Structure

### Directory Structure on EC2 Server

```
/var/www/tutoringapp/
├── uploads/
│   ├── resumes/
│   │   ├── resume_user1_listing5.pdf
│   │   ├── resume_user2_listing8.pdf
│   │   └── ...
│   ├── videos/
│   │   ├── video_user1_listing5.mp4
│   │   ├── video_user2_listing8.webm
│   │   └── ...
│   └── tutor_photo/
│       ├── photo_user1.jpg
│       ├── photo_user2.png
│       └── ...
└── [other application files]
```

### Database Path Storage

**tutor_listing table:**
- `resume_path`: VARCHAR storing paths like `/uploads/resumes/resume_user1_listing5.pdf`
- `video_sample_path`: VARCHAR storing paths like `/uploads/videos/video_user1_listing5.mp4` (nullable)

**user_account table:**
- `photo`: VARCHAR storing paths like `/uploads/tutor_photo/photo_user1.jpg` (nullable)

**Important:** Paths stored in DB are relative to the web root, matching the Nginx configuration.

---

## 🔄 Two-Phase Upload Approach

### Option 1: Upload Files First, Then Create Listing/Update Profile

**Flow:**
```
1. User selects files in form
2. User clicks "Upload Files" button
   └─> Frontend sends files to /api/upload/resume, /api/upload/video, /api/upload/photo
   └─> Backend saves files and returns paths
   └─> Frontend stores returned paths in state
3. User fills rest of form and clicks "Submit Listing"
   └─> Frontend sends listing data with stored paths
   └─> Backend creates listing with paths (no file handling needed)
```



---

## Implementation Details

### Backend Requirements

#### 1. File Upload Service

Create a service to handle file operations:
- Generate unique filenames (e.g., `resume_{userId}_{listingId}_{timestamp}.pdf`)
- Create directories if they don't exist
- Save files to appropriate subdirectory
- Return relative paths
- Handle file validation (type, size)

#### 2. File Upload Controller

Endpoints needed:
- `POST /api/upload/resume` - Upload resume file
- `POST /api/upload/video` - Upload video file
- `POST /api/upload/tutor-photo` - Upload tutor photo

Each endpoint:
- Receives `MultipartFile`
- Validates file
- Calls service to save file
- Returns path to store in database

#### 4. Update Existing Controllers

**TutorListingController:**
- Modify `/api/listings/create` to handle multipart requests
- OR keep it simple and expect paths (if using Option 1)

**UserAccountController:**
- Add endpoint to update user photo
- OR handle photo upload in profile update endpoint


---

## 🔐 Security Considerations

### File Validation

1. **File Type Validation:**
   - Check MIME type, not just extension
   - Whitelist allowed types:
     - Resumes: `application/pdf`, `image/jpeg`, `image/png`, `image/webp`
     - Videos: `video/mp4`, `video/webm`
     - Photos: `image/jpeg`, `image/png`, `image/webp`

2. **File Size Limits:**
   - Resumes: Max 10MB
   - Videos: Max 50MB
   - Photos: Max 5MB

3. **Filename Sanitization:**
   - Remove special characters
   - Generate unique names (prevent overwrites)
   - Use UUID or timestamp-based naming

4. **Path Traversal Prevention:**
   - Validate file paths
   - Never allow user input in file paths
   - Use absolute paths when saving

5. **Authentication:**
   - Ensure user is logged in
   - Verify user owns the listing/profile they're uploading for

---

## Step-by-Step Implementation Plan

### Phase 1: Backend File Upload Service

1. **Create FileUploadService.java**
   - Methods: `saveResume()`, `saveVideo()`, `savePhoto()`
   - File validation logic
   - Directory creation
   - Unique filename generation

2. **Create FileUploadController.java**
   - Three endpoints for uploads
   - Authentication checks
   - Error handling

3. **Add configuration**
   - Update `application.properties` with file size limits
   - Set upload directory path

### Phase 2: Update Backend Controllers

1. **TutorListingController**
   - Modify create endpoint to handle file uploads
   - OR create separate endpoint for listing with files

2. **UserAccountController**
   - Add photo upload endpoint
   - OR update profile endpoint to handle photo

### Phase 3: Frontend Updates

1. **TutorListingForm.jsx**
   - Change payload to use FormData
   - Send actual files, not just filenames
   - Handle file upload responses

2. **UserProfilePage.jsx** 
   - Add photo upload functionality
   - Update profile service calls

3. **Update services**
   - Modify API calls to use FormData when needed

### Unique Filenames
- Prevents overwriting when users upload files with same name
- Common strategies:
  - UUID: `uuid-abc-123-def.pdf`
  - Timestamp: `resume_1699123456789.pdf`
  - User+Listing: `resume_user5_listing12.pdf`

---




**Spring Boot file upload documentation:
- https://spring.io/guides/gs/uploading-files/
- Spring Boot MultipartFile handling