# Running the Website Locally

## Overview
- **Backend:** Runs on **port 8080** and serves all routes that begin with `/api`.
- **Frontend:** Runs on **port 3000** and serves all other routes. Frontend will call the backend /api pages on 8080
- **NOTE** we currently don't differentiate local deployment vs remote deployment, so you have to manually update the URL

---

### 1) Start the Backend (Java / Spring Boot)

1. **Import as Maven project (IntelliJ)**
   - In the backend folder, right-click [pom.xml](../application/backend/pom.xml) → **Add as Maven Project**.
     - You should see Java files with blue circle icons (instead of orange mugs).

2. **Run the server**
    - **Option A: IntelliJ**
      - Open `Main.java` and click **Run**.
    - **Option B: Maven (terminal)**
      - cd to `/backend` directory 
      - Then run: `mvn spring-boot:run`

3. **Verify**
    - Visit **http://localhost:8080** — you should see a Whitelabel Error Page.
    - Test an API route like **http://localhost:8080/api/team-members** to see a sample JSON.

---

### 2) Start the Frontend (React)

1. **Update URL**
   - In `frontend/src/service/TeamMembersService.js` change all references to either http://18.144.101.99 or http://localhost, 
     depending on which backend you want the frontend to call

2. **Change into the frontend directory**
   - `cd <local-path>/frontend`

3. **Start the Dev Server**
   - `npm run start`

4. **Verify**
   - Visit http://localhost:3000.