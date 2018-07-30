const push = ({ size }) => {
  return `pushed ${size > 1 ? `${size} commits` : 'a commit'} to`;
};

module.exports = {
  push
};
