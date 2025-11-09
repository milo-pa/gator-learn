# Credentials Folder

## SSH
- Server URL or IP: `18.144.101.99`
- SSH username: `ec2-user`
- SSH password or key: `Tutoring_Server_Key.pem` file (located in this folder)
  - Note: permissions may need to be set with `chmod 400 Tutoring_Server_Key.pem`

## Database
4. Database URL or IP and port used:

   `localhost:3306/tutoring_production`
5. Database username:

   `root`
6. Database password

   `GatorLearn@Team5`
7. Database name (basically the name that contains all your tables)

   `tutoring_production`
8. Instructions on how to use the above information.

    - Connect to the server via SSH
      - Move into credentials folder: `cd application/credentials`
      - Make the connection: `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`
        - This may first require a permissions change of the .pem file: `chmod 400 Tutoring_Server_Key.pem`
    
    - Login to the database
      - `mysql -u root -p`, Then enter password `GatorLearn@Team5` when prompted
    
    - Then, view or modify the database; For example, viewing table rows
      - View all databases: `SHOW DATABASES;`
      - Select one: `USE <database_name>`
      - View tables of that database: `SHOW TABLES;`
      - View the rows of a table: `SELECT * FROM <table_name>;`
    
    

# Most important things to Remember
## Above is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
