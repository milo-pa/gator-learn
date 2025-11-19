## Accessing the MySQL Database running on AWS

### Connect to the server via SSH
- Move into credentials folder: `cd application/credentials`
- Make the connection: `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`
  - This may first require a permissions change of the .pem file: `chmod 400 Tutoring_Server_Key.pem`

### Login to the database
- `mysql -u root -p`, Then enter password `GatorLearn@Team5` when prompted

### View or modify the database

#### For example, viewing table rows
- View all databases: `SHOW DATABASES;`
- Select one: `USE <database_name>`
- View tables of that database: `SHOW TABLES;`
- View the rows of a table: `SELECT * FROM <table_name>;`