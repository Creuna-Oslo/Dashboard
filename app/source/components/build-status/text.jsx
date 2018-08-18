import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ branch, pullRequest, statusMessage }) => {
  const startText = `Build ${statusMessage.toLowerCase()} ${
    pullRequest ? 'for PR' : 'on'
  } `;
  const endText = pullRequest
    ? `#${pullRequest.number} ${pullRequest.title}`
    : branch;

  return (
    <div>
      {startText}
      <b>{endText}</b>
    </div>
  );
};

Text.propTypes = {
  branch: PropTypes.string,
  pullRequest: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      number: PropTypes.number,
      title: PropTypes.string
    })
  ]),
  statusMessage: PropTypes.string
};

Text.defaultProps = {
  statusMessage: ''
};

export default Text;
