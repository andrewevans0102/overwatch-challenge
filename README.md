# Overwatch Challenge

This is the repo for the Overwatch Challenge Open Source project.

Please check out the User Guide for visual instructions [here](https://andrewevans0102.github.io/overwatch-challenge/).

This project provides an application that teams can use to gamify their learning processes.
- Users create "Activities" every time they learn somthing.
- Once a week (i.e. Friday) the team admin will clear the scores and save the 1st, 2nd, and 3rd place winners.  Then the team can share what they learned that week in as much (or little) time as they like.

This project uses Google's Firebase with the [Angular Fire 2 Library](https://github.com/angular/angularfire2) for the following:
1. Hosting
2. Authentication
3. Database Storage (Document Driven)
4. Cloud Functions

This project also uses [CircleCI](https://circleci.com/) for deployments.

## Project Organization
This project is organized into the following folders:
1. `docs` is where the markdown files are stored that are used in the instrutions site
2. `frontend` is where the Angular 2+ application code resides
3. `functions` is where the Google Firebase Cloud Functions code resides
4. `scripts` is where all deployment scripts are located

## Frontend Project Organization
The frontend project is organied loosely based on feature in the following folders:
1. `/src/app/activity` all components that are used to work with displaying and storing activity in the application
2. `/src/app/static` all static pages that show users or activity in the application
3. `/src/app/users` all components that are used to work with user accounts in the application
4. `/src/app/models` any models used in the application

## Slack Integeration
- The project includes a `slack integration` for team members.  Once you get registered, one of the admins can send you an invite to the slack channel.
- The application uses Fireabase Cloud Functions to emit slack notifications (1) when users are registered and (2) when activities are created
- The slack webhooks are also defined within the hosted project and are also environment variables in the open source repo
- If you want to creat your own webhooks or use these, please contact the repo owner for more information

## Running Locally
- ```npm run frontend-serve``` runs the frontend angular application locally
- ```npm run frontend-build``` builds the frontend angular application locally
- ```npm run frontend-deploy``` deploys the frontend application to firebase
- ```npm run functions-serve``` runs the firebase cloud functions locally
- ```npm run functions-deploy``` deploys the firebase cloud functions
- ```npm run environment-variables``` loads in the environment variables to the `environment.ts` and `environment.prod.ts` files respectively (see "Permissions" section below)

## Permissions
- This project requires a created Firebase project to be run locally (and deployed)
- Please consult the [Firebase documentation](https://firebase.google.com/docs/web/setup/?authuser=0#config-object) for how to set this up  
- Please also consult my blog [post here](https://rhythmandbinary.com/2018/04/08/firebase/)
- As a security precaution, the keys have all been replaced with alias values in this project.  These correspond to environment variables.  I've created a script that you can run to populate these values (once you've created a Firebase project).  You just need to create the following environment variables that correspond to the keys above: 
- `OC_apiKey`
- `OC_authDomain`
- `OC_databaseURL`
- `OC_projectId`
- `OC_storageBucket`
- `OC_messageSenderId`
- `OC_slack1` (slack webhook for registerd users)
- `OC_slack2` (slack webhook for createing activities)

To export variables to your local bash session you just run the following:
```
export BASH_VARIABLE='<your_bash_variable>
```
If you want to permanently add them, you can add them to your bash profile.

Once you've got the variables saved on your system run:
```
npm run environment-variables
```
and that will copy them over to the corresponding values in the `environment.ts` and `environment.prod.ts` files as well as the Firebase Cloud Functions `index.js` file.

# User Guide
- User guide code is in the `docs` folder
- User guide is built with [MkDocs](https://www.mkdocs.org/)
- In order to deploy a new copy of the user guide, you'll need to have MkDocs installed on your computer by following the [directions here](https://www.mkdocs.org/#installation)
- Once you have MkDocs installed, build the site by running (from the project root) `npm run docs-build`
- When you're ready to deploy the site, deploy the site to be hosted on GitHub pages with `npm run docs-deploy`
- Note that the message for the commit includes "[ci skip]", this is so that CircleCI will not run a build on the gh-pages branch

# Cypress Testing
- The frontend application uses Cypress for e2e testing
- To run tests from the project root run `npm run frontend-cypress-test`
- Note that you'll need to run the npm script for environment variables first with `npm run environment-variables` because the values used in testing are Cypress environment variables ([see docs for more info](https://docs.cypress.io/guides/guides/environment-variables.html#Setting))
- When the project is deployed with CircleCI, Cypress is run in the pipeline with `npm run frontend-cypress-run`
- When running the cypress tests for the frontend application, the npm module [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) is used
- The use of `http-get` was necessary with `start-server-and-test` because the frontend is an Angular Webpack project ([see special note here](https://www.npmjs.com/package/start-server-and-test#note-for-webpack-dev-server-users))

## Future Improvements
Future improvements on the horizon (PR's Welcome!):
1. Refactor service calls to be in specific classes around their function
2. Build out more tests for code coverage (potentially may be using Cypress for this in the future)
3. Add more visual elements
4. Add more details to the instructions (docs) site