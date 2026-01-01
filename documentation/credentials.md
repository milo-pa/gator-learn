# Credentials Folder

## SSH
- Server URL or IP: `18.144.101.99`
- SSH username: `ec2-user`
- SSH password or key: `Tutoring_Server_Key.pem` file (located in this folder)
  - Note: permissions may need to be set with `chmod 400 Tutoring_Server_Key.pem`
- Instructions on how to use the above information
  - run `ssh -i <local path>/Tutoring_Server_Key.pem ec2-user@18.144.101.99`

## Database
1. Database URL or IP and port used:
   - `localhost:3306/tutoring_production` Database    
2. Database username:
   - `ec2-user`
3. Database password
   - `REDACTED`
4. Database name (basically the name that contains all your tables)
   - `tutoring_production`   This is our production database
   - `tutoring_test`         This is our database for testing
5. Instructions on how to use the above information.
    - Connect to the server via SSH
      - Move into credentials folder: `cd application/credentials`
      - Make the connection: `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`
        - This may first require a permissions change of the .pem file: `chmod 400 Tutoring_Server_Key.pem`
    
    - Login to the database
      - `mysql -u ec2-user -p`, Then enter password `REDACTED` when prompted
    
    - Then, view or modify the database; For example, viewing table rows
      - View all databases: `SHOW DATABASES;`
      - Select one: `USE <database_name>;`
      - View tables of that database: `SHOW TABLES;`
      - View the rows of a table: `SELECT * FROM <table_name>;`
