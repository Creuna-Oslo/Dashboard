import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

import getText from './get-text';

const supportedTypes = Object.keys(getText);

const Notification = ({ meta, user, repository, time, type }) => {
  if (!supportedTypes.includes(type)) {
    return null;
  }

  const shouldShowBranchName = type === 'push';

  return (
    <div className={cn('notification', `theme-${type}`)}>
      <img src={user.avatar} />
      <div className="notification-text">
        <b className="notification-username">{user.name}</b>
        <span dangerouslySetInnerHTML={{ __html: `${getText[type](meta)} ` }} />
        <b>{`${repository.name}${
          shouldShowBranchName ? '/' + repository.branch : ''
        }`}</b>
      </div>

      {/* Timestamps are stored as negative numbers in Firebase. */}
      <div className="notification-time">
        <TimeAgo locale="en">{-time}</TimeAgo>
      </div>
    </div>
  );
};

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
