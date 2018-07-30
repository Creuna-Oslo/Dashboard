import React from 'react';
import PropTypes from 'prop-types';

import getNotificationText from './get-notification-text';

const Notifications = ({ items }) => (
  <div className="notifications">
    {items.map(
      item =>
        getNotificationText[item.type] ? (
          <p key={item.time}>{getNotificationText[item.type](item)}</p>
        ) : null
    )}
  </div>
);

Notifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object)
};

Notifications.defaultProps = {
  items: []
};

export default Notifications;
