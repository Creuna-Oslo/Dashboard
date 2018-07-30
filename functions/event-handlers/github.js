const getUser = user => ({
  avatar: user.avatar_url,
  name: user.login
});

// All exported functions expect a GitHub webhooks payload object. Function names must correspond to GitHub event names.

const pull_request = payload => {
  const { action, number } = payload;
  const pr = payload.pull_request;

  // Only notify when PRs are opened and merged
  if (
    !["opened", "closed"].includes(action) ||
    (action === "closed" && !pr.merged)
  ) {
    return false;
  }

  const merged = action === "closed" && pr.merged;

  return {
    meta: {
      number,
      title: pr.title
    },
    repository: {
      branch: pr.base.ref,
      name: pr.base.repo.name
    },
    type: merged ? "prMerge" : "prOpen",
    user: getUser(pr.merged_by || pr.user)
  };
};

const push = payload => {
  const { commits, ref, repository, sender, size } = payload;

  return {
    meta: { size: size || commits.length },
    repository: {
      branch: ref.split("/").pop(),
      name: repository.name
    },
    type: "push",
    user: getUser(sender)
  };
};

module.exports = {
  pull_request,
  push
};
