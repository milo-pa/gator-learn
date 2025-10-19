## Deploying Build

SSH to server with the credentials. Must be in credentials folder  
- `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`
- key may require permissions reset
  - `chmod 400 Tutoring_Server_Key.pem`

Enter project folder  
`cd /opt/tutoringapp`

Delete old jar  
`sudo rm SFSUTutoring-1.0.0.jar`

Exit SSH  
`logout`

Copy local jar file to remote live deployment folder. It must be named `SFSUTutoring-1.0.0.jar`  
`scp -i Tutoring_Server_Key.pem <local path to file> ec2-user@18.144.101.99:/opt/tutoringapp/releases`

SSH back in  
`ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`

Restart service after switching jar  
`sudo systemctl restart tutoring_jar`

## Notes

Path to app files on server. Ownership assigned to default ec2-user user  
`/opt/tutoringapp/`

Systemctl service file path  
`/etc/systemd/system/tutoring_jar.service` 
The systemctl enables the jar and keeps it running  
if you change service file, run `sudo systemctl daemon-reload`

When adding a completely new jar, use
- `sudo systemctl enable --now tutoring_jar` enables the new jar
- `sudo systemctl status tutoring_jar --no-pager` this is just a status check

Nginx folder
- `/etc/nginx/`
- Nginx config Files
  - `/etc/nginx/nginx.conf`
  - `/etc/nginx/conf.d/tutoringapp.conf`

Nginx config files organize the network traffic. They currently reverse proxy all incoming traffic to local 8080.   
If you modify an nginx config file, run `sudo systemctl reload nginx`


## Installing Tech Stack

dnf is the package manager for Amazon Linux

smn smn... i'll add more later