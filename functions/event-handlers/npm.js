const crypto = require("crypto");
const functions = require("firebase-functions");

module.exports = request => {
  const signature = request.headers["x-npm-signature"];
  // console.log(request._body);
  console.log(Buffer.from(request.body));

  // From: https://github.com/npm/npm-hook-receiver/blob/master/index.js#L24
  const expected = crypto
    .createHmac("sha256", functions.config().npm.secret)
    .update(Buffer.from(request.body))
    .digest("hex");
  if (signature !== "sha256=" + expected) {
    console.log("Bad signature");
  }

  const { body } = request;
  const { name } = body;
  const version = body.payload["dist-tags"].latest;

  return { name, version };
};
