const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  const eventType = request.headers["x-github-event"];

  if (eventType === "push") {
    const { pusher, ref, repository, sender, size } = request.body;

    const notification = {
      pusher: {
        name: pusher.name,
        sender: sender.avatar_url
      },
      repository: {
        branch: ref.split("/").pop(),
        name: repository.name
      },
      size,
      type: "push"
    };

    console.log(notification);
    response.status(200).send();
  } else {
    response.status(500).send(`Unsupported event ${eventType}`);
  }
});
