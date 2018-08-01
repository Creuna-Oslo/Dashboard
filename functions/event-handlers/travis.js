// Expects an express request object from a Travis webhook
module.exports = request => {
  // Travis request bodies have a single key: payload. The content of body.payload is a json string which needs to be parsed
  const payload = JSON.parse(request.body.payload);

  if (!payload) {
    return false;
  }

  const { branch, repository, state, status_message } = payload;
  const { id, name } = repository;

  if (branch !== "master") {
    return false;
  }

  return { id, name, state, statusMessage: status_message };
};
