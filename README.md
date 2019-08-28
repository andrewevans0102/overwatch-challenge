# Overwatch Challenge

This is the repo for the Overwatch Challenge Open Source project.

Please check out the User Guide for visual instructions [here](https://andrewevans0102.github.io/overwatch-challenge/).

This project provides an application that teams can use to gamify their learning processes.
- Users create "Activities" every time they learn somthing.
- Everyone comes together at the end of a week to see who scored the highest
- Admins maintain the scores
- Scores and activities are saved for future reference

This project uses Google's Firebase with the [Angular Fire 2 Library](https://github.com/angular/angularfire2) for the following:
1. Hosting
2. Authentication
3. Database Storage (Document Driven)
4. Cloud Functions

This project also uses [CircleCI](https://circleci.com/) for deployments.

The project includes a `slack integration` for team members.  Once you get registered, one of the admins can send you an invite to the slack channel.

The application uses Fireabase Cloud Functions to emit slack notifications (1) when users are registered and (2) when activities are created

# Slack
- please join the project's [slack channel](https://join.slack.com/t/overwatch-challenge/shared_invite/enQtNzQxMzAwODEzMDA4LTU0OWIzNDRmZDUwMmMzMTY0NDUyYjhkMDcxYTgzZTFmNzlmOGQ3ODA0ODAzYTBjNzQ1ODU5NmJkNDFiOWQ3ODQ)
- you can also [login here](https://overwatch-challenge.slack.com)

# HOW TO RUN FRONTEND LOCALLY
- create a firebase app (for free) with the [console here](https://console.firebase.google.com/)
- register your app following the [insructions here](https://firebase.google.com/docs/web/setup)
- take the values you got from your registration and put them into the environment files in the `frontend/src/app/environment` directory
- make sure to install the [firebase CLI](https://firebase.google.com/docs/cli)
- go to the `frontend` directory and run `firebase init` to initialize your application for hosting
- from the project root run `npm run frontend-serve` and you should be good to go!
- if you have further questions, please review the [AngularFire2 docs](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md)

# HOW TO RUN FIREBASE FUNCTIONS LOCALLY
- create a firebase app (for free) with the [console here](https://console.firebase.google.com/)
- make sure to install the [firebase CLI](https://firebase.google.com/docs/cli)
- create [Slack webhooks](https://api.slack.com/incoming-webhooks) for your project
- create a `.env` file in the `functions` directory and put the values for the Slack Webhooks (note that this project uses [dotenv](https://www.npmjs.com/package/dotenv))
- go to the `functions` directory and run `firebase init` to initialize the dependencies etc.
- in the `functions` directory run `npm run serve` to run them locally
- in the `functions` directory run `npm run deploy` to deploy the functions to Google Cloud

## Project Folder Direcgtories and Organization
This project is organized into the following folders:
1. `docs` is where the markdown files are stored that are used in the instrutions site
2. `frontend` is where the Angular 2+ application code resides
3. `functions` is where the Google Firebase Cloud Functions code resides
4. `scripts` is where all deployment scripts are located

## Frontend Project
The frontend project is organized based on __feature__ in the following folders:
1. `/src/app/activity` all components that are used to work with displaying and storing activity in the application
2. `/src/app/static` all static pages that show users or activity in the application
3. `/src/app/users` all components that are used to work with user accounts in the application
4. `/src/app/models` any models used in the application

## Running Locally
- ```npm run frontend-serve``` runs the frontend angular application locally
- ```npm run frontend-build``` builds the frontend angular application locally
- ```npm run frontend-deploy``` deploys the frontend application to firebase
- ```npm run functions-serve``` runs the firebase cloud functions locally
- ```npm run functions-deploy``` deploys the firebase cloud functions
- ```npm run cypress-local``` runs the cypress tests locally with a test runner
- ```npm run cupress-ci``` runs the cypress tests headless for CI deployments

# Cypress Testing
- The frontend application uses Cypress for e2e testing
- To run tests from the project root run `npm run frontend-cypress-test`
- Note that you'll need to run the npm script for environment variables first with `npm run environment-variables` because the values used in testing are Cypress environment variables ([see docs for more info](https://docs.cypress.io/guides/guides/environment-variables.html#Setting))
- When the project is deployed with CircleCI, Cypress is run in the pipeline with `npm run frontend-cypress-run`
- When running the cypress tests for the frontend application, the npm module [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) is used
- The use of `http-get` was necessary with `start-server-and-test` because the frontend is an Angular Webpack project ([see special note here](https://www.npmjs.com/package/start-server-and-test#note-for-webpack-dev-server-users))
- Cypress environment variables are loaded in from the  `cypress.json` file
- Please checkout my blog post on [Cypress Testing](https://blog.angularindepth.com/how-cypress-makes-testing-fun-a56da1294285)

# User Guide
- User guide code is in the `docs` folder
- User guide is built with [MkDocs](https://www.mkdocs.org/)
- In order to deploy a new copy of the user guide, you'll need to have MkDocs installed on your computer by following the [directions here](https://www.mkdocs.org/#installation)
- Once you have MkDocs installed, build the site by running (from the project root) `npm run docs-build`
- When you're ready to deploy the site, deploy the site to be hosted on GitHub pages with `npm run docs-deploy`
- Note that the message for the commit includes "[ci skip]", this is so that CircleCI will not run a build on the gh-pages branch

## Additional Documentation
- Please consult the [Firebase documentation](https://firebase.google.com/docs/web/setup/?authuser=0#config-object) for how to set this up  
- Please also consult my blog [post here](https://rhythmandbinary.com/2018/04/08/firebase/)
- Please also consult my blog post on how this [project implements the JAMstack architecture here](https://blog.angularindepth.com/why-building-with-a-jamstack-is-awesome-49618fd21198)
- Please also consult my blog post on how [Firebase Cloud Functions work here](https://blog.angularindepth.com/why-firebase-cloud-functions-are-awesome-f4faeab630f7)

## Future Improvements
Future improvements on the horizon (PR's Welcome!):
1. Refactor service calls to be in specific classes around their function
2. Build out more tests for code coverage (potentially may be using Cypress for this in the future)
3. make application more responsive
4. Add more details to the instructions (docs) site