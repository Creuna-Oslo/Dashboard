const admin = require("firebase-admin");
const functions = require("firebase-functions");

const gitHubEventHandler = require("./event-handlers/github");
const NPMEventHandler = require("./event-handlers/npm");
const travisEventHandler = require("./event-handlers/travis");

admin.initializeApp(functions.config().firebase);
const database = admin.database();

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const notification = gitHubEventHandler(request);

  if (!notification) {
    response.status(200).send("Skipped adding event data");
    return;
  }

  database.ref("notifications").push(
    Object.assign({}, notification, {
      // Negative timestamp because Firebase doesn't support ordering in reverse order (newest first)
      time: -new Date().getTime()
    })
  );

  response.status(200).send(`Successfully added event data`);
});

exports.onNPMHook = functions.https.onRequest((request, response) => {
  const package = NPMEventHandler(request);

  database
    .ref("packages")
    .child(package.id)
    .update(package);

  response.status(200).send();
});

exports.onTravisHook = functions.https.onRequest((request, response) => {
  const buildStatus = travisEventHandler(request);

  database
    .ref("projects")
    .child(buildStatus.repositoryName)
    .child("build")
    .update(Object.assign(buildStatus, { time: new Date().getTime() }));

  response.status(200).send("Added build status");
});
