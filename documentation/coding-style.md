# Coding Style and Documentation

### Naming Conventions (variables, functions, classes)
- **Be consistent with design document and use natural, easy to understand names for everything.**
- Make the program “self documenting” by choosing clear, descriptive names.

### File Naming and Organization
- Group files of a similar purpose in folders named in lowercase.
- **Java Backend**
  - Pascal case for Java files (e.g. `MyFile.java`)
- **React JS Frontend**
  - PascalCase and `.jsx` file extension for files with React syntax (e.g. `MyComponent.jsx`)
  - camelCase for hook or utility files (e.g. `myFile.js`)
  - kebab style for CSS files (e.g. `my-file.css`)

### Code Formatting
- Language guides (do not need to follow everything, but they are good references):
  - [Twitter's Java Guide](https://github.com/twitter-archive/commons/blob/master/src/java/com/twitter/common/styleguide.md#documentation)
  - [Google's JavaScript Guide](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments)
  - [AirBnb React/JS Guide](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments)
- **Ensure naming of objects, DB tables, variables, and methods adheres to M2 Database naming.**

### Code Comments
- **[Standard Header block](#standard-header) must be added and filled in at the top of each file.**
- **Use in-line comments to explain code that is not intuitive or trivial (this is graded).**
- [Oracle Java Comments](https://www.oracle.com/java/technologies/javase/codeconventions-comments.html)

### Documentation
- Consider using a tool that automatically generates documentation (to be researched):
  - https://en.wikipedia.org/wiki/Comparison_of_documentation_generators
  - https://learn.microsoft.com/en-us/training/modules/generate-documentation-using-github-copilot-tools/

---

### Standard Header

```text
/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: [Your Name]
 * Created: [Date]
 * Description: [Brief explanation of this file’s purpose, 1-3 lines]
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */