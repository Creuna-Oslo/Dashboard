const admin = require("firebase-admin");
const functions = require("firebase-functions");

const gitHubEventHandlers = require("./event-handlers/github");

admin.initializeApp(functions.config().firebase);

const database = admin.database();

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const eventType = request.headers["x-github-event"];

  if (gitHubEventHandlers[eventType]) {
    database.ref("notifications").push(gitHubEventHandlers(request.body));

    response.status(200).send();
  } else {
    response.status(500).send(`Unsupported event ${eventType}`);
  }
});
