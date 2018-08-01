const crypto = require("crypto");
const functions = require("firebase-functions");

module.exports = request => {
  const signature = request.headers["x-npm-signature"];

  // From: https://github.com/npm/npm-hook-receiver/blob/master/index.js#L24
  const expected = crypto
    .createHmac("sha256", functions.config().npm.secret)
    .update(Buffer.from(request.rawBody))
    .digest("hex");
  if (signature !== "sha256=" + expected) {
    console.log(typeof request.rawBody);
    console.log("Bad signature");
    console.log(signature);
    console.log("sha256=" + expected);
  }

  const { body } = request;
  const { name } = body;
  const version = body.payload["dist-tags"].latest;

  // Remove namespace from id because Firebase will interpret this as a new json object
  return {
    name,
    id: name.replace("@creuna/", ""),
    time: new Date().getTime(),
    version
  };
};
