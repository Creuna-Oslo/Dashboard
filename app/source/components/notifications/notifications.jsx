import React from 'react';
import PropTypes from 'prop-types';

import Notification from '../notification';

const Notifications = ({ items }) => (
  <div className="notifications">
    {items.map(item => (
      <Notification key={item.time} {...item} />
    ))}
  </div>
);

Notifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Notification.propTypes))
};

Notifications.defaultProps = {
  items: []
};

export default Notifications;
