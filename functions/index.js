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

  projectRef(repository.name).update({
    issues: repository.issues,
    name: repository.name,
    url: repository.url
  });

  const currentDayStartTime = new Date().setUTCHours(0, 0, 0, 0);

  // Update activity count for current day
  projectRef(repository.name)
    .child("activity")
    .child(currentDayStartTime)
    .transaction(
      activityCount => (activityCount || 0) + repository.activityCount
    );

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

  projectRef(package.repositoryName).update({ npm: package });

  response.status(200).send("Done processing NPM webhook");
});

exports.onTravisHook = functions.https.onRequest((request, response) => {
  const buildStatus = travisEventHandler(request);
  const build = Object.assign(buildStatus, { time: new Date().getTime() });

  projectRef(buildStatus.repositoryName).update({ build });

  // Update name in case the package does not have a 'repository' field in its package.json. In these cases, there is no connection between the npm package and a GitHub repo. '<project-name>.name' in the database will therefore not have been set by the GitHub webhook handler and needs to be added.
  projectRef(buildStatus.repositoryName)
    .child("name")
    .transaction(name => name || buildStatus.repositoryName);

  response.status(200).send("Done processing Travis webhook");
});
