import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Icon from '../icon';
import Time from '../time';
import Text from './text';

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
      <div className="build-status-text">
        <Text
          branch={branch}
          pullRequest={pullRequest}
          statusMessage={statusMessage}
        />
        <Time time={time} />
      </div>
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

export default BuildStatus;
