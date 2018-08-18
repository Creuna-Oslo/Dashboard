const getUser = user => ({
  avatar: user.avatar_url,
  name: user.login
});

const issues = payload => {
  const { action, issue, repository } = payload;

  // Only notify when issues are opened and closed
  if (!["opened", "closed"].includes(action)) {
    return false;
  }

  return {
    meta: {
      number: issue.number,
      title: issue.title
    },
    repository: {
      name: repository.name
    },
    type: action === "opened" ? "issueOpen" : "issueClose",
    user: getUser(issue.user)
  };
};

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
      name: pr.base.repo.name
    },
    type: merged ? "prMerge" : "prOpen",
    user: getUser(pr.merged_by || pr.user)
  };
};

const push = payload => {
  const { commits, ref, repository, sender } = payload;

  // Ignore pushes without commits (branch addition/deletion) and pushes that include commits made by GitHub (Merge pushes)
  if (
    !commits.length ||
    commits.find(({ committer }) => committer.username === "web-flow")
  ) {
    return false;
  }

  return {
    meta: { size: commits.length },
    repository: {
      branch: ref.split("/").pop(),
      name: repository.name
    },
    type: "push",
    user: getUser(sender)
  };
};

const getRepositoryMeta = request => {
  const { repository } = request;

  return { name: repository.name, issues: repository.open_issues };
};

// The names of the event handlers must match the event name from the 'x-github-event' header.
const eventHandlers = {
  issues,
  pull_request,
  push
};

const noop = () => {};

// Expects an express request object from a GitHub webhook
module.exports = request => {
  const eventType = request.headers["x-github-event"];
  const eventHandler = eventHandlers[eventType] || noop;

  return {
    notification: eventHandler(request.body),
    repository: getRepositoryMeta(request)
  };
};
