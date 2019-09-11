require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const request = require("request");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors({ origin: true }));

// when a new user is registered
exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const firstName = newValue.firstName;
    const lastName = newValue.lastName;
    const slackWebhook = process.env.CREATE_USER;
    const message = "user " + firstName + " " + lastName + " just registered!";

    request
      .post(slackWebhook, { json: { text: message } })
      .then(() => {
        return res.status(200).send("slack message sent successfully");
      })
      .catch(() => {
        return res.status(500).semd("error occured whens ending slack message");
      });
  });

// when a new activity is created
exports.createActivity = functions.firestore
  .document("activity/{Id}")
  .onCreate((snap, context) => {
    const newValue = snap.data();
    const firstName = newValue.firstName;
    const lastName = newValue.lastName;
    const activity = newValue.activity;
    const description = newValue.description;
    const link = newValue.link;
    const points = newValue.points;
    const slackWebhook = process.env.CREATE_ACTIVITY;
    const message =
      firstName +
      " " +
      lastName +
      " just added the activity " +
      activity +
      " for " +
      points +
      ' points with the description "' +
      description +
      ".\"  Here's a the link " +
      link +
      ".";

    request
      .post(slackWebhook, { json: { text: message } })
      .then(() => {
        return res.status(200).send("slack message sent successfully");
      })
      .catch(() => {
        return res.status(500).semd("error occured whens ending slack message");
      });
  });

// sends an email with the high scores
app.post("/api/email/high_score", (req, res) => {
  (async () => {
    // request body should look like the following:
    // {
    // 	"to": "HanSolo@gmail.com",
    // 	"scores": {
    // 		"firstPlace": "Han Solo",
    // 		"secondPlace": "Chewbacca",
    // 		"thirdPlace": "Luke Skywalker"
    // 	}
    // }
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secureConnection: false,
      tls: {
        ciphers: "SSLv3"
      },
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const htmlBody =
      "<h1>Overwatch Challenge<h1>" +
      "<h2>This week's High Scores" +
      `<ul><li>First Place: ${req.body.scores.firstPlace}</li>` +
      `<li>Second Place: ${req.body.scores.secondPlace}</li>` +
      `<li>Third Place: ${req.body.scores.thirdPlace}</li></ul>` +
      "<p>--Chessie Evans from the Overwatch Challenge <3</p>";

    let info = await transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        bcc: req.body.to,
        subject: "Overwatch Challenge",
        html: htmlBody
      })
      .then(success => {
        return res.status(200).send("email sent successfully");
      })
      .catch(error => {
        return res.status(500).send("error occured when sending email");
      });
  })();
});

exports.app = functions.https.onRequest(app);
