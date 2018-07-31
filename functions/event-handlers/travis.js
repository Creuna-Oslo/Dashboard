module.exports = payload => {
  const { branch, repository, state, status_message } = payload;
  const { id, name } = repository;

  if (branch !== "master") {
    return false;
  }

  return { id, name, state, statusMessage: status_message };
};
