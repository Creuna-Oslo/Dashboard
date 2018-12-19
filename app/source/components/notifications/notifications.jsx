import React from 'react';
import FlipMotion from 'react-flip-motion';

import firebase from 'js/firebase-helper';
import Notification from '../notification';

class Notifications extends React.Component {
  state = {
    notifications: []
  };

  componentDidMount() {
    firebase.onNotification(notifications => {
      this.setState({ notifications });
    });
  }

  render() {
    return (
      <FlipMotion className="notifications">
        {this.state.notifications.map(item => (
          <Notification key={item.time} {...item} />
        ))}
      </FlipMotion>
    );
  }
}

export default Notifications;
