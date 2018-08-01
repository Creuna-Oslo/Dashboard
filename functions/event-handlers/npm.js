const crypto = require("crypto");
const functions = require("firebase-functions");

module.exports = request => {
  const signature = request.headers["x-npm-signature"];

  // From: https://github.com/npm/npm-hook-receiver/blob/master/index.js#L24
  // request._body from the above example seems to be the raw body of the request
  const expected = crypto
    .createHmac("sha256", functions.config().npm.secret)
    .update(request.rawBody)
    .digest("hex");
  if (signature !== "sha256=" + expected) {
    console.warn("Bad signature");
  }

  const { body } = request;
  const { event, name } = body;
  const version = body.payload["dist-tags"].latest;

  // Remove namespace from id because Firebase will interpret this as a new json object
  return {
    package: {
      name,
      id: name.replace("@creuna/", ""),
      time: new Date().getTime(),
      version
    },
    shouldRemove: event === "package:unpublish"
  };
};
