const prMerge = ({ number, title }) => {
  return `merged pull request <b>#${number} ${title}</b> in`;
};

const prOpen = ({ number, title }) => {
  return `created pull request <b>#${number} ${title}</b> in`;
};

const push = ({ size }) => {
  return `pushed ${size > 1 ? `${size} commits` : 'a commit'} to`;
};

module.exports = {
  prMerge,
  prOpen,
  push
};
