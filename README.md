<a name="readme-top"></a>

<h3 align="center">Family Vine</h3>

  <p align="center">
    Family Vine is an image metadata alteration software with use-cases ranging from genealogy and ancestry to social media. These docs should be useful for setting up the dev environment and understanding the basics of how the software is currently implemented.
  </p>
</div>

### Built With

* Electron (Backend framework)
* React (Frontend Library)
* SqLite3 (Embedded Database Design)

<!-- GETTING STARTED -->
## Getting Started

The dev environment is quite simple to set up, though it has only been actively tested on Windows (x64) machines in VS Code. There are certain demo wrappers that exist to accommodate MacOS/Linux users, though they are not verbose and for all intents and purposes, are completely untested.

### Prerequisites

* NPM is used throughout the project, and is the essence of the build system, testing system, and collation manager. 
  ```sh
  npm install -g npm
  ```
* VS Code can be downloaded for free [here](https://code.visualstudio.com/download).
* When using SqLite3 it embeds the database onto the local disk with a ```.db``` file. Though not explicitly necessary, nor a dependency for the project, there exists an application called [DB Browser](https://sqlitebrowser.org/dl/) that lets you visualize, create, store, and remove these files. It is strongly recommended for you to use this program.

### Installation

Once you have completed the above and have the development branch open in VS Code, open the terminal with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd>.

Simply running ```npm i``` will install all currently versioned dependencies with automatic postinstall. 

Next, running ```npm run dev``` will run the following script:
https://github.com/ssenseless/family-vine/blob/cfe66c30f2dab1c8844bf46b3ed29ca3ab76b955/package.json#L41
This script opens React on port 3000 (ensure that this is not blocked by other processes), then waits for it to become responsive before concurrently running Electron. This is all automatically assembled in dev mode, so it will automatically open devtools along with the application, though these dev flags are ignored during the actual building process, so the fully built application will not have these issues.

<!-- ROADMAP -->
## Proposed Features/Issues
See the [open issues](https://github.com/ssenseless/family-vine/issues) for a list of currently proposed features.

<!-- CONTRIBUTING -->
## Contributing

Contributions are typical as for any github project:

1. Fork this repository
2. Create your feature branch: 
```sh
git checkout -b feature/feature-one
```
3. Stage, commit, and push your changes: 
```sh
git add .
git commit -m 'new feature here'
git push origin feature/feature-one
```
4. Open a pull request
