# API Documentation

## Database Tables

### `tutor_listing`:

<details>
  <summary>View Table</summary>
  
| Field             | Type         | Null | Key | Default | Extra          |
|-------------------|--------------|------|-----|---------|----------------|
| listing_id        | int          | NO   | PRI | NULL    | auto_increment |
| user_id           | int          | NO   | MUL | NULL    |                |
| subject_id        | int          | NO   | MUL | NULL    |                |
| course_id         | int          | NO   | MUL | NULL    |                |
| price_per_hour    | decimal(6,2) | NO   |     | NULL    |                |
| available_time    | varchar(255) | NO   |     | NULL    |                |
| resume_path       | varchar(255) | NO   |     | NULL    |                |
| description       | text         | NO   |     | NULL    |                |
| video_sample_path | varchar(255) | YES  |     | NULL    |                |
| live              | tinyint(1)   | NO   |     | 1       |                |
</details>


### `subject`:

<details>
  <summary>View Table</summary>

| Field        | Type         | Null | Key | Default | Extra          |
|--------------|--------------|------|-----|---------|----------------|
| subject_id   | int          | NO   | PRI | NULL    | auto_increment |
| subject_name | varchar(100) | NO   |     | NULL    |                |
| category     | varchar(50)  | NO   |     | NULL    |                |
| description  | text         | YES  |     | NULL    |                |
</details>


### `course`:

<details>
  <summary>View Table</summary>
  
| Field         | Type         | Null | Key | Default | Extra          |
|---------------|--------------|------|-----|---------|----------------|
| course_id     | int          | NO   | PRI | NULL    | auto_increment |
| subject_id    | int          | NO   | MUL | NULL    |                |
| course_name   | varchar(100) | NO   |     | NULL    |                |
| course_number | varchar(10)  | NO   |     | NULL    |                |
| description   | text         | YES  |     | NULL    |                |
</details>

## API Endpoints

### `api/listings`

This endpoint will return TutorListing objects _(see application/backend/src/main/java/dev/teamfive/tutoring/model/TutorListing.java)_ or lists of TutorListing objects, serialized as json.

<details>
  <summary>Example serialzied TutorListing</summary>
  
```
{
  "listingId": 12,
  "userId": 1,
  "subject": {
    "subjectId": 1,
    "subjectName": "Computer Science",
    "category": "STEM",
    "description": "Programming, algorithms, and software design."
  },
  "course": {
    "courseId": 1,
    "subjectId": 1,
    "courseName": "Operating Systems",
    "courseNumber": "CSC 415",
    "description": "Operating system concepts: concurrent processes, basic synchronization techniques, deadlock, memory management, file systems, security, networks, and distributed processing."
  },
  "pricePerHour": 25.0,
  "availableTime": "Mon 2PM-5PM, Wed 2PM-5PM",
  "resumePath": "/uploads/alice_resume.pdf",
  "description": "Covers OS topics like processes, threads, and memory management.",
  "tutoringVideoSamplePath": "/uploads/alice_video.mp4",
  "live": 1
}
```
</details>


### Sub-endpoints

##### ○ `api/listings`
This default endpoint returns a list of all TutorListings in the database table.

##### ○ `api/listings/{listing_id}`

Returns a single TutorListing whose listingId matches the given integer.

Example: `api/listings/12`
<details>
  <summary>View</summary>
  
```
{
  "listingId": 12,
  "userId": 1,
  "subject": {
    "subjectId": 1,
    "subjectName": "Computer Science",
    "category": "STEM",
    "description": "Programming, algorithms, and software design."
  },
  "course": {
    "courseId": 1,
    "subjectId": 1,
    "courseName": "Operating Systems",
    "courseNumber": "CSC 415",
    "description": "Operating system concepts: concurrent processes, basic synchronization techniques, deadlock, memory management, file systems, security, networks, and distributed processing."
  },
  "pricePerHour": 25.0,
  "availableTime": "Mon 2PM-5PM, Wed 2PM-5PM",
  "resumePath": "/uploads/alice_resume.pdf",
  "description": "Covers OS topics like processes, threads, and memory management.",
  "tutoringVideoSamplePath": "/uploads/alice_video.mp4",
  "live": 1
}
```
</details>

##### ○ `api/listings/by-course/{course_name_contains}`

Returns a list of TutorListings whose course name **contains** the given string.

Example: `api/listings/by-course/Data`
<details>
  <summary>View</summary>
  
```
[
  {
    "listingId": 13,
    "userId": 1,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 2,
      "subjectId": 1,
      "courseName": "Data Structures and Algorithms",
      "courseNumber": "CSC 220",
      "description": "Linear and non-linear data structures in Java, including lists, stacks, queues, trees, tables, and graphs. Recursion, iteration over collections, Big O notation, and hash tables."
    },
    "pricePerHour": 24.0,
    "availableTime": "Tue 10AM-1PM, Thu 10AM-1PM",
    "resumePath": "/uploads/alice_resume.pdf",
    "description": "Teaches data structures such as linked lists, trees, and graphs.",
    "tutoringVideoSamplePath": "/uploads/alice_ds.mp4",
    "live": 1
  },
  {
    "listingId": 17,
    "userId": 2,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 2,
      "subjectId": 1,
      "courseName": "Data Structures and Algorithms",
      "courseNumber": "CSC 220",
      "description": "Linear and non-linear data structures in Java, including lists, stacks, queues, trees, tables, and graphs. Recursion, iteration over collections, Big O notation, and hash tables."
    },
    "pricePerHour": 27.0,
    "availableTime": "Tue 9AM-12PM, Thu 9AM-12PM",
    "resumePath": "/uploads/brian_resume.pdf",
    "description": "Explains algorithm efficiency and problem-solving techniques.",
    "tutoringVideoSamplePath": "/uploads/brian_algo.mp4",
    "live": 1
  }
]
```
</details>

##### ○ `api/listings/by-subject/{subject_name_contains}`

Returns a list of TutorListings whose subject name **contains** the given string.

Example: `api/listings/by-subject/Science`
<details>
  <summary>View</summary>

```
[
  {
    "listingId": 12,
    "userId": 1,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 1,
      "subjectId": 1,
      "courseName": "Operating Systems",
      "courseNumber": "CSC 415",
      "description": "Operating system concepts: concurrent processes, basic synchronization techniques, deadlock, memory management, file systems, security, networks, and distributed processing."
    },
    "pricePerHour": 25.0,
    "availableTime": "Mon 2PM-5PM, Wed 2PM-5PM",
    "resumePath": "/uploads/alice_resume.pdf",
    "description": "Covers OS topics like processes, threads, and memory management.",
    "tutoringVideoSamplePath": "/uploads/alice_video.mp4",
    "live": 1
  },
  {
    "listingId": 13,
    "userId": 1,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 2,
      "subjectId": 1,
      "courseName": "Data Structures and Algorithms",
      "courseNumber": "CSC 220",
      "description": "Linear and non-linear data structures in Java, including lists, stacks, queues, trees, tables, and graphs. Recursion, iteration over collections, Big O notation, and hash tables."
    },
    "pricePerHour": 24.0,
    "availableTime": "Tue 10AM-1PM, Thu 10AM-1PM",
    "resumePath": "/uploads/alice_resume.pdf",
    "description": "Teaches data structures such as linked lists, trees, and graphs.",
    "tutoringVideoSamplePath": "/uploads/alice_ds.mp4",
    "live": 1
  },
  {
    "listingId": 17,
    "userId": 2,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 2,
      "subjectId": 1,
      "courseName": "Data Structures and Algorithms",
      "courseNumber": "CSC 220",
      "description": "Linear and non-linear data structures in Java, including lists, stacks, queues, trees, tables, and graphs. Recursion, iteration over collections, Big O notation, and hash tables."
    },
    "pricePerHour": 27.0,
    "availableTime": "Tue 9AM-12PM, Thu 9AM-12PM",
    "resumePath": "/uploads/brian_resume.pdf",
    "description": "Explains algorithm efficiency and problem-solving techniques.",
    "tutoringVideoSamplePath": "/uploads/brian_algo.mp4",
    "live": 1
  },
  {
    "listingId": 18,
    "userId": 2,
    "subject": {
      "subjectId": 1,
      "subjectName": "Computer Science",
      "category": "STEM",
      "description": "Programming, algorithms, and software design."
    },
    "course": {
      "courseId": 1,
      "subjectId": 1,
      "courseName": "Operating Systems",
      "courseNumber": "CSC 415",
      "description": "Operating system concepts: concurrent processes, basic synchronization techniques, deadlock, memory management, file systems, security, networks, and distributed processing."
    },
    "pricePerHour": 28.0,
    "availableTime": "Fri 2PM-5PM",
    "resumePath": "/uploads/brian_resume.pdf",
    "description": "Operating Systems: concurrency, scheduling, and file systems.",
    "tutoringVideoSamplePath": "/uploads/brian_os.mp4",
    "live": 1
  }
]
```
</details>

