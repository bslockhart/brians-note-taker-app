# Note Taker Starter Code

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
An application called Note Taker that can be used to write and save notes. This application uses an Express.js back end and saves and retrieves note data from a JSON file.

## Table of Contents
* [Tools](#tools)
* [Mock Up](#Mock-Up)
* [Instructions](#Instructions)
* [Links](#Links)
* [User Story](#User-Story)
* [Acceptance Criteria](#Acceptance-Criteria)
* [Tests](#Tests)
* [Technical Acceptance Criteria](#Technical-Acceptance-Criteria)
* [Deployment](#Deployment)
* [Application Quality](#Application-Quality)
* [Repository Quality](#Repository-Quality)
* [Bonus](#Bonus)
* [Submission](#Submission)

### Tools
- Express.js
- Node.js
- File system module (fs)
- Path module
- HTML (Hardcoded and Dynamic)
- JavaScript
- CSS

### Mock Up
![Team Generator HTML Webpage Screenshot](./assets/images/11-express-homework-demo-01.png)
![Team Generator HTML Webpage Screenshot](./assets/images/11-express-homework-demo-02.png)


## Instructions
1. Clone the main project, then open the cloned file.
2. Make sure you are in the main project folder using the 'cd' command.
3. Open command prompt and run: npm install
4. Initiate file in command prompt: npm run dev
5. Or, visit the live page via Heroku link (see links)

## Links
* Link to the live application:
[View Here]()

### User Story
* AS A small business owner
* I WANT to be able to write and save notes
* SO THAT I can organize my thoughts and keep track of tasks I need to complete

### Acceptance Criteria:
* GIVEN a note-taking application
* WHEN I open the Note Taker
* THEN I am presented with a landing page with a link to a notes page
* WHEN I click on the link to the notes page
* THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
* WHEN I enter a new note title and the note’s text
* THEN a Save icon appears in the navigation at the top of the page
* WHEN I click on the Save icon
* THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
* WHEN I click on an existing note in the list in the left-hand column
* THEN that note appears in the right-hand column
* WHEN I click on the Write icon in the navigation at the top of the page
* THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

### Tests
* The command line to run a test on this application is: node server.js

### Technical Acceptance Criteria
* Satisfies all of the preceding acceptance criteria plus the following:
- Application front end must connect to an Express.js back end.
- Application back end must store notes with unique IDs in a JSON file.
- Application must be deployed to Heroku.

### Deployment
* Application deployed at live URL.
* Application loads with no errors.
* Application GitHub URL submitted.
* GitHub repository contains application code.

### Application Quality
* Application console is free of errors.

### Repository Quality
* Repository has a unique name.
* Repository follows best practices for file structure and naming conventions.
* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
* Repository contains multiple descriptive commit messages.
* Repository contains a high-quality README with description and a link to walkthrough video.

### Bonus
* Application allows users to delete notes.

### Submission
* Date Submitted: October 11, 2022
* The URL of the functional, deployed application: https://brians-note-taker-app.herokuapp.com/
* The URL of the GitHub repository, including a unqique name and a README describing the project: https://github.com/bslockhart/brians-note-taker-app