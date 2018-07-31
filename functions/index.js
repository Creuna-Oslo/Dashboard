const admin = require("firebase-admin");
const functions = require("firebase-functions");

const gitHubEventHandlers = require("./event-handlers/github");
const travisEventHandler = require("./event-handlers/travis");

admin.initializeApp(functions.config().firebase);
const database = admin.database();

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const eventType = request.headers["x-github-event"];
  const eventHandler = gitHubEventHandlers[eventType];
  const notification = eventHandler && eventHandler(request.body);

  if (!eventHandler) {
    response.status(500).send(`Unsupported event type '${eventType}'`);
    return;
  }

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

  response.status(200).send(`Successfully added ${eventType} event data`);
});

exports.onTravisHook = functions.https.onRequest((request, response) => {
  const buildStatus = travisEventHandler(request.body.payload);

  if (!buildStatus) {
    response.status(200).send("Skipping");
  }

  const { id } = buildStatus;

  database.ref("debug").push(request.body);
  database
    .ref("builds")
    .child(id)
    .update(buildStatus);
  response.status(200).send("Added build status");
});
