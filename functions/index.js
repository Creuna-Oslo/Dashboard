const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const eventType = request.headers["x-github-event"];

  if (eventType === "push") {
    const { commits, pusher, ref, repository, sender, size } = request.body;

    const notification = {
      pusher: {
        avatar: sender.avatar_url,
        name: pusher.name
      },
      repository: {
        branch: ref.split("/").pop(),
        name: repository.name
      },
      size: size || commits.length,
      type: "push"
    };

    console.log(notification);
    response.status(200).send();
  } else {
    response.status(500).send(`Unsupported event ${eventType}`);
  }
});
