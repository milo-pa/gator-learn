# Running the Website Locally

## Overview
- **Backend:** Runs on **port 8080** and serves all routes that begin with `/api`.
- **Frontend:** Runs on **port 3000** and serves all other routes. Frontend will call the backend /api pages on 8080

---

### 1) Start the Backend (Java / Spring Boot)

1. **Import as Maven project (IntelliJ)**
   - In the backend folder, right-click [pom.xml](../application/backend/pom.xml) → **Add as Maven Project**.
     - You should see Java files with blue circle icons (instead of orange mugs).

2. **Open a local connection to the database and the web port running on AWS**
   - ```
     ssh -i Tutoring_Server_Key.pem \
     -L 3306:127.0.0.1:3306 \
     -L 8081:127.0.0.1:80 \
     ec2-user@18.144.101.99
     ```
     - This is the same as the command from milo's ssh command from [server-deploy.md](./server-deploy.md)
        except for the extra part in the middle to configure port forwarding
     - This essentially forwards all traffic from your localhost port 3306 to the aws instance's port 3306, 
       and all web port traffic from local host port 8081 to aws port 80
     - Keep this terminal window open or the connection will terminate. It can also time-out

3. **Run the server**
    - **Option A: IntelliJ**
      - Open `Main.java` and click **Run**.
    - **Option B: Maven (terminal)** in a new terminal window
      - cd `<local path>/backend`
      - Then run: `mvn spring-boot:run`

4. **Verify**
    - Visit http://localhost:8080 — you should see a 404 error page.
    - Test an API route like http://localhost:8080/api/listings to see a sample JSON.

---

### 2) Start the Frontend (React)

1. **Change into the frontend directory**
   - `cd <local path>/frontend`

2. **Start the Dev Server**
   - `npm run start`

3. **Verify**
   - Visit http://localhost:3000 - you should see the home page