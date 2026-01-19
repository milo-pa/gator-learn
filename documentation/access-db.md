## Accessing the MySQL Database running on AWS

---

## Connect Locally

### Connect to the server via SSH
- Move into credentials folder: `cd application/credentials`
- Make the connection: `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`
  - This may first require a permissions change of the .pem file: `chmod 400 Tutoring_Server_Key.pem`

### Login to the database
- `mysql -u root -p`, Then enter password `REDACTED` when prompted

### View or modify the database

#### For example, viewing table rows
- View all databases: `SHOW DATABASES;`
- Select one: `USE <database_name>`
- View tables of that database: `SHOW TABLES;`
- View the rows of a table: `SELECT * FROM <table_name>;`

---

## Connect through MySQLWorkbench

- Open MySQL Workbench and click the + icon next to "MySQL Connections" to create a new connection.
- Set Connection Method: Select Standard TCP/IP over SSH from the dropdown menu.
- Configure SSH Settings:
  - SSH Hostname: Enter your EC2 instance’s Public IP or Public DNS.
  - SSH Username: Enter the default OS user (ec2-user for our Amazon Linux)
  - SSH Key File: Click the browse button and select your .pem private key file.
- Configure Database Settings:
  - MySQL Hostname: Enter 127.0.0.1 (since you are connecting locally through the tunnel).
  - MySQL Server Port: Enter 3306 (or the custom port your DB uses).
- Username/Password: Enter your database credentials (can be found in [credentials README](../credentials/README.md))
- Test Connection: Click Test Connection. If successful, click OK to save.
