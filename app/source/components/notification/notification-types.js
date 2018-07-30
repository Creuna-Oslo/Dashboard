const prMerge = {
  icon: 'git-merge',
  text: ({ number, title }) =>
    `merged pull request <b>#${number} ${title}</b> in`
};

const prOpen = {
  icon: 'git-pull-request',
  text: ({ number, title }) =>
    `created pull request <b>#${number} ${title}</b> in`
};

const push = {
  icon: 'git-commit',
  text: ({ size }) => `pushed ${size > 1 ? `${size} commits` : 'a commit'} to`
};

module.exports = {
  prMerge,
  prOpen,
  push
};
