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

---
### `api/listings`

This endpoint will return TutorListing objects _(see application/backend/src/main/java/dev/teamfive/tutoring/model/TutorListing.java)_ or lists of TutorListing objects, serialized as json.

<details>
  <summary>Example serialzied TutorListing</summary>
  
```
{
"listingId": 14,
"account": {
  "userId": 1,
  "name": "Alice Kim",
  "email": "akim@sfsu.edu",
  "password": "Alice12345",
  "photoPath": null,
  "description": "Computer Science Major aspiting to be a Web Developer",
  "pronouns": "She/Her"
},
"subject": {
  "subjectId": 2,
  "subjectName": "Mathematics",
  "category": "STEM",
  "description": "Calculus, algebra, and quantitative reasoning."
},
"course": {
  "courseId": 3,
  "subjectId": 2,
  "courseName": "Calculus I",
  "courseNumber": "MATH 226",
  "description": "Graphs. Differentiation: theory, techniques, and applications. Integration: Fundamental Theorem of Calculus and applications. Transcendental functions."
},
"pricePerHour": 20.0,
"availableTime": "Fri 9AM-12PM",
"resumePath": "/uploads/alice_resume.pdf",
"description": "Helps CS students understand calculus basics and problem solving.",
"tutoringVideoSamplePath": null,
"live": 1
}
```
</details>

---
#### `api/listings`

This default endpoint returns a list of all TutorListings in the database table.

---
#### `api/listings/search?<KEY>=<VALUE>&<KEY>=<VALUE>&<KEY>=<VALUE><...>`

 This is the search endpoint for retrieving a list of TutorListings,
 each of whose properties match ALL the given search parameters.

 An api call might look like `api/listings/search?listingDescription=calc&accountName=Alice`.
 The key value pairs (search parameters) for this call are `listingDescription : calc` and `accountName : Alice`.

An api call can have an infinite number of search parameters, however a finite number are actually recognized.
Currently, the recognized parameters, as well as their corresponding fields of a TutorListing object, 
and columns in database tables are:
```
----------------------------------------------------------------------------------
|  Search Parameter    |  TutorListing Field     |  Database Table/Col           |
----------------------------------------------------------------------------------
|  listingId           |  listingId              |  tutor_listing / listing_id   |
|  listingDescription  |  description            |  tutor_listing / description  |
|  accountName         |  account#name           |  user_account / name          |
|  subjectName         |  subject#subjectName    |  subject / subject_name       |
|  courseName          |  course#courseName      |  course / course_name         |
|  courseNumber        |  course#courseNumber    |  course / course_number       |
----------------------------------------------------------------------------------
```

