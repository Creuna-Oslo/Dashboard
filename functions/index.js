const admin = require("firebase-admin");
const functions = require("firebase-functions");

const gitHubEventHandlers = require("./event-handlers/github");

admin.initializeApp(functions.config().firebase);

const database = admin.database();

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const eventType = request.headers["x-github-event"];
  const eventHandler = gitHubEventHandlers[eventType];

  if (eventHandler) {
    // Negative timestamp because Firebase doesn't support ordering in reverse order (newest first).
    const notification = Object.assign({}, eventHandler(request.body), {
      time: -new Date().getTime()
    });

    database.ref("notifications").push(notification);

    response.status(200).send(`Successfully added ${eventType} event data`);
  } else {
    response.status(500).send(`Unsupported event type '${eventType}'`);
  }
});
