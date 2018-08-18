import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Icon from '../icon';
import Time from '../time';

import buildStatuses from './build-statuses';

const BuildStatus = ({ branch, pullRequest, state, statusMessage, time }) => {
  const icon = buildStatuses(state).icon;

  return (
    <div className="build-status">
      {icon && (
        <div className={cn('build-status-icon', icon)}>
          <Icon name={icon} theme={Icon.themes.outline} />
        </div>
      )}
      Build {statusMessage.toLowerCase()} on <b>{branch}</b>
      <Time time={time} />
    </div>
  );
};

BuildStatus.propTypes = {
  branch: PropTypes.string,
  pullRequest: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  state: PropTypes.string,
  statusMessage: PropTypes.string,
  time: PropTypes.number
};

BuildStatus.defaultProps = {
  statusMessage: ''
};
export default BuildStatus;
