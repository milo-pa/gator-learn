## Bundling the frontend into the backend

### Open a new terminal to build the frontend

Ensure you're in the frontend folder (need package.lock accessible for npm run build):

-   e.g. run: `cd application/frontend`

Build the frontend with npm:

-   run: `npm run build`

Now the frontend files should be built (js minified, etc) and will be in `frontend/build`

> Before moving these files, **REMOVE OR REPLACE** the old files in `backend/src/main/resources/static` from the previous bundle, if any.

Copy and paste or cut (contents of `frontend/build` will now be unneeded) the entire **CONTENTS** of `frontend/build` into `backend/src/main/resources/static`

> Again, important: Move the **CONTENTS** of the frontend build folder, **NOT** the entire build folder.

**Spring Boot will use the contents of `backend/src/main/resources/static` for static resources (bundling the frontend together with the backend)**

### Open a new terminal to start the backend (or run through button in IDE)

Now, you should be able to run the backend (with bundled frontend) _e.g. `java Main.java`_ or by clicking run in `Main.java`
