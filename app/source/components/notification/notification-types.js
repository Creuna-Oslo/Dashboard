const issueClose = {
  className: 'theme-issue-close',
  icon: 'issue-closed',
  text: ({ number, title }) => `closed issue <b>#${number} ${title}</b> in`
};

const issueComment = {
  className: 'theme-issue-comment',
  icon: 'issue-comment',
  text: ({ number, title }) =>
    `commented on issue <b>#${number} ${title}</b> in`
};

const issueOpen = {
  className: 'theme-issue-open',
  icon: 'issue-opened',
  text: ({ number, title }) => `created issue <b>#${number} ${title}</b> in`
};

const prMerge = {
  className: 'theme-merge',
  icon: 'git-merge',
  text: ({ number, title }) =>
    `merged pull request <b>#${number} ${title}</b> in`
};

const prOpen = {
  className: 'theme-pull-request',
  icon: 'git-pull-request',
  text: ({ number, title }) =>
    `created pull request <b>#${number} ${title}</b> in`
};

const push = {
  className: 'theme-push',
  icon: 'git-commit',
  text: ({ size }) => `pushed ${size > 1 ? `${size} commits` : 'a commit'} to`
};

module.exports = {
  issueClose,
  issueComment,
  issueOpen,
  prMerge,
  prOpen,
  push
};
