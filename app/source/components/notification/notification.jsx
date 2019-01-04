import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import notificationTypes from './notification-types';

import Card from '../card';
import Icon from '../icon';
import Link from '../link';
import Time from '../time';

const Notification = ({ meta, user, repository, time, type }) => {
  const notificationType = notificationTypes[type];

  if (!notificationType) {
    return null;
  }

  return (
    <Card>
      <div className="notification">
        <div className="notification-user">
          <Link className="notification-avatar" url={user.url}>
            <img src={user.avatar} />
          </Link>
          {notificationType.icon && (
            <div
              className={cn('notification-icon', notificationType.className)}
            >
              <Icon name={notificationType.icon} />
            </div>
          )}
        </div>

        <div className="notification-text">
          <b>
            <Link url={user.url}>{user.name}</Link>
          </b>{' '}
          {notificationType.text(meta)}{' '}
          <b>
            <Link url={repository.url}>{repository.name}</Link>
            {repository.branch ? '/' + repository.branch : ''}
          </b>
        </div>

        {/* Timestamps are stored as negative numbers in Firebase. */}
        <div className="notification-time">
          <Time time={-time} />
        </div>
      </div>
    </Card>
  );
};

Notification.propTypes = {
  meta: PropTypes.object,
  user: PropTypes.object,
  repository: PropTypes.object,
  time: PropTypes.number,
  type: PropTypes.oneOf(Object.keys(notificationTypes))
};

Notification.defaultProps = {
  user: {},
  repository: {}
};

export default Notification;
