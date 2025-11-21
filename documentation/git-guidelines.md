## Git Guidelines

### Commits

- **Keep short commit titles, details in description**
  - Makes it clear which changes were implemented by each commit. Increases legibility and makes debugging easier.
  - `git commit -m <title>` or `git commit -m <title> -m <optional-description>`
  - Commit titles should be less than 60 characters

- **Small, frequent commits grouped by concept.**
  - Makes it clear which files were changed for each feature. Saves work progress, and makes debugging easier.

- **No pushing commits directly to `main` branch**
  - Already enforced by branch rules. Changes will be pull requested and require review. All versions in main should be fully functional

### Pushes

- **Always Fetch and Pull before pushing**
  - Make sure your local branch is up to date
  - `git fetch && git pull`
  - `git pull --rebase` can help avoid certain merge conflicts
- **Pull -> Rebase -> PullRequest/Merge for merging large branches**
    - Resolves merge conflicts on local branch instead of causing mess on .
    - Helps keep a clean git history
    - Pull Requests on GitHub for easy review
    - Smaller branches that aren't likely to have conflicts or need review can just be merged

- **Run code and pass test cases before pushing**
    - Prevents the entire repo from crashing for the rest when pulled

- **Deploy code locally before pushing**
    - Run and host it on localhost and make sure it works

- **No git push —force**
  - unless you are rebasing a feature branch (use `--force-with-lease`) or you've made a mess with git. 
    I think we've all seen the memes on this one

### Branches

- **Make sure you are on the correct branch**
  - We are following the git workflow, which has several branches and it’s easy to forget which one we are on. 
    If you make a mistake you can switch branches, resetting and stashing changes if needed.
  - `git branch` to see all local
  - `git branch -all` to see all local and remote
  - `git branch --show-current` to show current

- **Make new branches for features**
  - Any sizable features should be worked on in their own branch.
  - Name feature branches as `feature/<branch-name>`, in all lower case
  - `git branch <branch-name>`

- **Delete finished branches**
    - Keeps branches clean and easy to pick
    - Make sure you delete them locally and remotely
      - Locally: `git branch --delete <branch-name>` or `git branch -D <branch-name>` if it isn't fully merged
      - Remotely: `git push origin --delete <branch-name>`
    - When someone else deletes a remote branch, you can stop tracking it with `git fetch --prune`
  
### Settings

- **Setup a global gitignore**
    - Make `.gitignore_global` file in user directory (or wherever you like)
      - Put OS and editor specific files in here, like DS_Store, Thumbs.db, or Word progress files
    - Command to set: `git config --global core.excludesfile ~/.gitignore_global`

---

### **Resources**
- https://www.youtube.com/@philomatics  
- Git Workflow Explanation: https://nvie.com/posts/a-successful-git-branching-model/ 
- Anthony Souza class slides