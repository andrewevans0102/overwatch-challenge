# Overwatch Challenge

This is the repo for the Overwatch Challenge Open Source project.

This project provides an application that teams can use to gamify their learning processes.
- Users create "Activities" every time they learn somthing.
- Once a week (i.e. Friday) the team admin will clear the scores and save the 1st, 2nd, and 3rd place winners.  Then the team can share what they learned that week in as much (or little) time as they like.

This project uses Google's Firebase with the [Angular Fire 2 Library](https://github.com/angular/angularfire2) for the following:
1. Hosting
2. Authentication
3. Database Storage (Document Driven)
4. Cloud Functions

This project also uses [CircleCI](https://circleci.com/) for deployments.

## Slack Integeration
- The project includes a `slack integration` for team members.  Connect with our team on [slack](https://overwatch-challenge.slack.com).
- The application uses Fireabase Cloud Functions to emit slack notifications (1) when users are registered and (2) when activities are created
- The slack webhooks are also defined within the hosted project and are also environment variables in the open source repo
- If you want to creat your own webhooks or use these, please contact the repo owner for more information

## Running Locally
- ```npm run frontend-serve``` runs the frontend angular application locally
- ```npm run frontend-build``` builds the frontend angular application locally
- ```npm run deploy-frontend``` deploys the frontend application to firebase
- ```npm run functions-serve``` runs the firebase cloud functions locally
- ```npm run functions-deploy``` deploys the firebase cloud functions
- ```npm run environment-variables``` loads in the environment variables to the `environment.ts` and `environment.prod.ts` files respectively (see "Permissions" section below)

## Permissions
- This project requires the following keys to be run locally (and when deploying to prod): 
```
firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
```

If you want to run a copy of the project, please create a firebase project and follow the basic setup I outlined in my blog [post here](https://rhythmandbinary.com/2018/04/08/firebase/).

I have already created a set of scripts that you can run that use environment variables.  You just need to create the following environment variables that correspond to the keys above: 
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

## Future Improvements
Future improvements on the horizon (PR's Welcome!):
1. Refactor service calls to be in specific classes for Authentication and Storage
2. Add more visual elements
3. Add to the documentation site (docs folder)
4. Add testing with Cypress