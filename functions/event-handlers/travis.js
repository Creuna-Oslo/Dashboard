module.exports = payload => {
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
