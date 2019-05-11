const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const request = require('request');

// when a new user is registered
exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const firstName = newValue.firstName;
      const lastName = newValue.lastName;
      const slackWebhook = 'OC_slack1';  
      const message = "user " + firstName + " " + lastName + " just registered!"; 
      
      request.post(
        slackWebhook, 
        { json: { text: message } })
        .then(() => {
            return res.status(200).send('slack message sent successfully');
        })
        .catch(() => { 
            return res.status(500).semd('error occured whens ending slack message'); 
        });
    });

// when a new activity is created
exports.createActivity = functions.firestore
    .document('teamActivity/{Id}')
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const firstName = newValue.firstName;
      const lastName = newValue.lastName;
      const activity = newValue.activity;
      const description = newValue.description;
      const link = newValue.link;
      const points = newValue.points;
      const slackWebhook = 'OC_slack2';  
      const message = firstName + " " + lastName + " just added the activity " + activity
        + " for " + points + " points with the description \"" + description + ".\"  Here's a the link " + link + "."; 

      request.post(
        slackWebhook, 
        { json: { text: message } })
        .then(() => {
            return res.status(200).send('slack message sent successfully');
        })
        .catch(() => { 
            return res.status(500).semd('error occured whens ending slack message'); 
        });
    });