import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Icon from '../icon';
import Link from '../link';
import Time from '../time';
import Text from './text';

import buildStatuses from './build-statuses';

const BuildStatus = ({
  branch,
  pullRequest,
  state,
  statusMessage,
  time,
  url
}) => {
  const icon = buildStatuses(state).icon;

  return (
    <Link className="build-status" url={url}>
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
    </Link>
  );
};

BuildStatus.propTypes = {
  branch: PropTypes.string,
  pullRequest: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  state: PropTypes.string,
  statusMessage: PropTypes.string,
  time: PropTypes.number,
  url: PropTypes.string
};

export default BuildStatus;
