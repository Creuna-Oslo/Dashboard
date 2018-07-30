const push = ({ size }) => {
  return `pushed ${size > 1 ? `${size} committs` : 'a commit'} to`;
};

module.exports = {
  push
};
