import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

import buildStatuses from './build-statuses';

import Icon from '../icon';

const Build = ({ name, state, statusMessage, time }) => {
  const buildStatus = buildStatuses[state];

  return (
    <div className={cn('build', buildStatus.className)}>
      {buildStatus.icon && (
        <div className="build-icon">
          <Icon name={buildStatus.icon} theme={Icon.themes.outline} />
        </div>
      )}

      <div className="build-text">
        <h3>{name}</h3>
        <p>{`Build ${statusMessage.toLowerCase()}`}</p>

        <div className="build-time">
          <TimeAgo locale="en">{time}</TimeAgo>
        </div>
      </div>
    </div>
  );
};

Build.propTypes = {
  name: PropTypes.string,
  state: PropTypes.string,
  statusMessage: PropTypes.string,
  time: PropTypes.number
};

Build.defaultProps = {
  statusMessage: ''
};

export default Build;
