# 📚 Tutoring Application Deployment & Server Documentation

## Automatic Deployment

Pushes to `main` automatically get deployed to the website through GitHub Actions.  

You can also manually trigger deployment from any branch by starting the _"CI/CD on Push to Main"_ Workflow in GitHub Actions.

---

## Manual Deployment (Outdated)

**Use Automatic Deployment when possible. Less error prone and we can track deployments.**

1. **Deploy the Backend JAR File**
   - Build the jar with `mvn clean package` from backend directory
   - Copy your local build to the remote live deployment folder. The file **must be named** `SFSUTutoring-1.0.0.jar` to overwrite the current running version.
     - `scp -i <local path>/Tutoring_Server_Key.pem -r <local path>/SFSUTutoring-1.0.0.jar ec2-user@18.144.101.99:/opt/tutoringapp/releases`

2. **Connect via SSH**
   - Access the remote server to manage the service.
     - `ssh -i Tutoring_Server_Key.pem ec2-user@18.144.101.99`

3. **Restart the Backend Service**
   - Restart the systemd service to pick up the new JAR file. This makes the new backend code live.
     - `sudo systemctl restart tutoring_jar`

4. **Exit SSH**
    - `logout`

5. **Deploy Frontend Build (React)**
   - Build the frontend with `npm run build` from frontend directory
   - Copy the compiled frontend build  to the Nginx serving directory. This step is last, ensuring the frontend calls the new, already-running backend.
     - `scp -i <local path>/Tutoring_Server_Key.pem -r <local path>/build/* ec2-user@18.144.101.99:/var/www/tutoringapp`

---

### ⚙️ Server File Paths & Configuration

This section provides an overview of important file locations and configuration notes on the server. 
System files used on the server are here in `/server_files`

#### Backend Application Files Structure

The backend application files are located here. Ownership is assigned to the default `ec2-user`.
```
/opt/tutoringapp
├─ bin/                            # scripts & operational helpers
│  └─ deploy_inplace.sh            # for CI/CD
└──releases/
   ├─ SFSUTutoring-1.0.0.jar       # versioned release
   ├─ current.jar -> SFSUTutoring-1.0.0.jar   # symlink used by systemd (not yet implemented)
   └─ ...                          # future versioned JARs
```

#### Frontend Application Files (React Build)

The compiled frontend is served by **Nginx** from this directory on the server. 
The frontend makes all calls to the public backend api

* **Path:** `/var/www/tutoringapp/`

#### Systemctl Service Configuration (Backend)

The service file controls the Java application.

* **Service File Path:** `/etc/systemd/system/tutoring_jar.service`

| Action             | Command                                         | Purpose                                                |
|:-------------------|:------------------------------------------------|:-------------------------------------------------------|
| **Reload Daemon**  | `sudo systemctl daemon-reload`                  | Must be run **after modifying** the service file.      |
| **Enable New JAR** | `sudo systemctl enable --now tutoring_jar`      | Use this when adding a **completely new** service/jar. |
| **Check Status**   | `sudo systemctl status tutoring_jar --no-pager` | Check the current status of the running service.       |

#### Nginx Configuration

Nginx organizes network traffic and currently **reverse proxies** all requests to the frontend at `/var/www/tutoringapp/`.

* **Main Config:** `/etc/nginx/nginx.conf`
* **App Config:** `/etc/nginx/conf.d/tutoringapp.conf`

**Reload Command:**
If you modify an Nginx config file, run: `sudo systemctl reload nginx`

---

### 🛠️ Tech Stack Installation

This section is for installing the necessary software stack on the Amazon Linux server.

* **Package Manager:** `dnf` is the package manager for Amazon Linux.

**Update packages**  
sudo dnf update -y

**Nginx**  
sudo dnf install -y nginx  
sudo systemctl enable --now nginx  

**(Optional) MySQL 8.4 client/server**  
sudo dnf install -y mysql mysql-server  
sudo systemctl enable --now mysqld

**(Optional) Certbot for Nginx (if domain + HTTPS)**  
sudo dnf install -y certbot python3-certbot-nginx  
sudo certbot --nginx -d your.domain