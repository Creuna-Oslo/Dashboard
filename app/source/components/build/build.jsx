import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

import Icon from '../icon';

const Build = ({ name, state, statusMessage, time }) => (
  <div className={cn('build', `theme-${state}`)}>
    <div className="build-content">
      <div className="build-icon">
        <Icon name={`travis-${state}`} theme={Icon.themes.outline} />
      </div>

      <div className="build-text">
        <h3>{name}</h3>
        <p>{`Build ${statusMessage.toLowerCase()}`}</p>
      </div>

      <div className="build-time">
        <TimeAgo locale="en">{time}</TimeAgo>
      </div>
    </div>
  </div>
);

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
