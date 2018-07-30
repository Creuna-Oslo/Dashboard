const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onGitHubHook = functions.https.onRequest((request, response) => {
  console.log(Object.keys(request.body));
  response.status(200).send();
  // const { pusher, repository, sender, size } = request.payload;
  // const notification = {
  //   pusher: {
  //     name: pusher.name,
  //     sender: sender.avatar_url
  //   },
  //   repository: {
  //     name: repository.name
  //   },
  //   size
  // };
  // console.log(notification);
});
