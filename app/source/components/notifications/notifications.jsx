import React from 'react';
import PropTypes from 'prop-types';
import FlipMotion from 'react-flip-motion';

import Notification from '../notification';

const Notifications = ({ items }) => (
  <FlipMotion className="notifications">
    {items.map(item => (
      <Notification key={item.time} {...item} />
    ))}
  </FlipMotion>
);

Notifications.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Notification.propTypes))
};

Notifications.defaultProps = {
  items: []
};

export default Notifications;
