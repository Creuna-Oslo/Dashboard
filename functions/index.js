const admin = require("firebase-admin");
const functions = require("firebase-functions");

const gitHubEventHandler = require("./event-handlers/github");
const NPMEventHandler = require("./event-handlers/npm");
const travisEventHandler = require("./event-handlers/travis");

admin.initializeApp(functions.config().firebase);
const database = admin.database();

const projectRef = repositoryName =>
  database.ref("projects").child(repositoryName);

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const { notification, repository } = gitHubEventHandler(request);

  projectRef(repository.name)
    .child("issues")
    .update(repository.issues);

  if (notification) {
    database.ref("notifications").push(
      Object.assign({}, notification, {
        // Negative timestamp because Firebase doesn't support ordering in reverse order (newest first)
        time: -new Date().getTime()
      })
    );
  }

  response.status(200).send("Done processing GitHub webhook");
});

exports.onNPMHook = functions.https.onRequest((request, response) => {
  const package = NPMEventHandler(request);

  database
    .ref("packages")
    .child(package.id)
    .update(package);

  response.status(200).send("Done processing NPM webhook");
});

exports.onTravisHook = functions.https.onRequest((request, response) => {
  const buildStatus = travisEventHandler(request);

  projectRef(buildStatus.repositoryName)
    .child("build")
    .update(Object.assign(buildStatus, { time: new Date().getTime() }));

  response.status(200).send("Done processing Travis webhook");
});
