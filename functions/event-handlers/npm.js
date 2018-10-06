const crypto = require("crypto");
const functions = require("firebase-functions");

const getRepositoryName = repository => {
  if (!repository) {
    return;
  }

  const repositoryUrl =
    typeof repository === "string" ? repository : repository.url;

  // Expects repository URL to be something like this: "git+https://github.com/Creuna-Oslo/repo-name.git"
  return (
    repositoryUrl &&
    repositoryUrl
      .split("/")
      .pop()
      .replace(".git", "")
  );
};

// Expects an express request object from an npm webhook
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
  const { name, payload } = body;

  // Remove namespace from id because Firebase will interpret this as a new json object
  return {
    name,
    repositoryName: getRepositoryName(payload.repository) || name,
    time: new Date().getTime(),
    url: `https://www.npmjs.com/package/${name}`,
    version: payload["dist-tags"].latest
  };
};
