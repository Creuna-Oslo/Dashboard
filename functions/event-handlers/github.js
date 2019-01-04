const getIssue = issue => ({
  number: issue.number,
  title: issue.title,
  url: issue.html_url
});

const getUser = user => ({
  avatar: user.avatar_url,
  name: user.login,
  url: user.html_url
});

const getRepo = repository => ({
  name: repository.name,
  url: repository.html_url
});

const issue_comment = payload => {
  const { comment, issue, repository } = payload;

  return {
    meta: getIssue(issue),
    repository: getRepo(repository),
    type: "issueComment",
    user: getUser(comment.user)
  };
};

const issues = payload => {
  const { action, issue, repository, sender } = payload;

  // Only notify when issues are opened and closed
  if (!["opened", "closed"].includes(action)) {
    return false;
  }

  return {
    meta: getIssue(issue),
    repository: getRepo(repository),
    type: action === "opened" ? "issueOpen" : "issueClose",
    user: getUser(sender)
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
    repository: getRepo(pr.base.repo),
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
    repository: Object.assign({}, getRepo(repository), {
      branch: ref
        .split("/")
        .slice(2)
        .join("/")
    }),
    type: "push",
    user: getUser(sender)
  };
};

const getRepositoryMeta = request => {
  const { commits, repository } = request;

  return {
    // 'commits' are only available in 'push' payloads. Fall back to 1
    activityCount: commits ? commits.length : 1,
    issues: repository.open_issues,
    name: repository.name,
    url: repository.html_url
  };
};

// The names of the event handlers must match the event name from the 'x-github-event' header.
const eventHandlers = {
  issue_comment,
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
    repository: getRepositoryMeta(request.body)
  };
};
