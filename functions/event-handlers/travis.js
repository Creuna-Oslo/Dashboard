module.exports = payload => {
  console.log(Object.keys(payload));
  const { branch, repository, state, status_message } = payload;
  console.log(branch, repository);
  const { id, name } = repository;

  if (branch !== "master") {
    return false;
  }

  return { id, name, state, statusMessage: status_message };
};
