const push = ({ repository, size }) => {
  return `pushed ${size > 1 ? `${size} committs` : 'a commit'} to ${
    repository.name
  }/${repository.branch}`;
};

module.exports = {
  push
};
