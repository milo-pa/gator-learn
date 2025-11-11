# Coding Style and Documentation

- Naming Conventions (variables, functions, classes)
  - **Be consistent with design document and use natural, easy to
	understand names for everything**
  - Make program be “self documenting” by choosing good naming
- File Naming and Organization
  - Group files of a similar purpose in folders named in lowercase
  - Java Backend:
    - Pascal case for Java codes (eg `MyFile.java`)
  - React JS Frontend:
    - PascalCase for for components (eg `myComponent.js`)
    - camelCase for hook or utility files (eg `myFile.js`)
    - kebab style for css sheets and files (`my-file.css`)
    - `.jsx` extension for any files with jsx syntax (Component files, for example)
- Code Formatting
  - Language Guides (don't need to follow all, but they are good pointers)
    - [Twitter's Java Guide](https://github.com/twitter-archive/commons/blob/master/src/java/com/twitter/common/styleguide.md#documentation)
    - [Google's JavaScript Guide](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments) 
    - [AirBnb React/JS Guide](https://google.github.io/styleguide/jsguide.html#jsdoc-top-file-level-comments)
  - **Ensure naming of objects, DB table, variable and methods adheres to M2 Database naming**
- Code Comments
  - **[Standard Header block](#standard-header) to be added and filled at the top of each file**
  - **In-line comments to explain code that is not intuitive/trivial (he grades for this)**
  - [Oracle Java Comments](https://www.oracle.com/java/technologies/javase/codeconventions-comments.html)
- Documentation 
  - Could use a tool that automatically generates documentation... don't know which one. research
    - https://en.wikipedia.org/wiki/Comparison_of_documentation_generators
    - https://learn.microsoft.com/en-us/training/modules/generate-documentation-using-github-copilot-tools/

### Standard Header
```
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
```

