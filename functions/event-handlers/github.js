// Given a GitHub 'push' event payload, this function extracts and returns the relevant bits.
const push = payload => {
  const { commits, pusher, ref, repository, sender, size } = payload;

  return {
    pusher: {
      avatar: sender.avatar_url,
      name: pusher.name
    },
    repository: {
      branch: ref.split("/").pop(),
      name: repository.name
    },
    size: size || commits.length,
    time: new Date().getTime(),
    type: "push"
  };
};

module.exports = {
  push
};
