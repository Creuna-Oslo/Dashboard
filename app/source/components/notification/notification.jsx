import React from 'react';
import PropTypes from 'prop-types';

import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

import getText from './get-text';

const supportedTypes = Object.keys(getText);

const Notification = ({ meta, user, repository, time, type }) =>
  supportedTypes[type] ? (
    <div className="notification">
      <img src={user.avatar} />
      <div className="notification-text">
        <b className="notification-username">{user.name}</b>
        <span>{`${getText[type](meta)} `}</span>
        <b>{`${repository.name}/${repository.branch}`}</b>
      </div>

      {/* Timestamps are stored as negative numbers in Firebase. */}
      <div className="notification-time">
        <TimeAgo locale="en">{-time}</TimeAgo>
      </div>
    </div>
  ) : null;

Notification.propTypes = {
  meta: PropTypes.object,
  user: PropTypes.object,
  repository: PropTypes.object,
  time: PropTypes.number,
  type: PropTypes.oneOf(supportedTypes)
};

Notification.defaultProps = {
  user: {},
  repository: {}
};

export default Notification;
