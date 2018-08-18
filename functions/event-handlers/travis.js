// Expects an express request object from a Travis webhook
module.exports = request => {
  // Travis request bodies have a single key: payload. The content of body.payload is a json string which needs to be parsed
  const payload = JSON.parse(request.body.payload);

  if (!payload) {
    return false;
  }

  const {
    branch,
    pull_request, // Boolean that indicates whether the build was triggered by a PR
    pull_request_number,
    pull_request_title,
    repository,
    state,
    status_message
  } = payload;

  return {
    branch,
    pullRequest: pull_request && {
      number: pull_request_number,
      title: pull_request_title
    },
    repositoryName: repository.name,
    state,
    statusMessage: status_message
  };
};
