import * as firebase from 'firebase/app';
import 'firebase/database';
import React from 'react';

import firebaseInit from '../../../../firebase-init.json';

import Notifications from '../notifications';

// This file renders the basic html pages when running the mockup
class Main extends React.Component {
  state = {
    notifications: []
  };

  componentDidMount() {
    firebase.initializeApp(firebaseInit);
    firebase
      .database()
      .ref('notifications')
      .orderByChild('time')
      .limitToFirst(20)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const notifications = [];

          // Sadly, forEach is the only way to ensure correct order of items from Firebase, forcing us to do this the old way
          snapshot.forEach(notification => {
            notifications.push(notification.val());
          });
          this.setState({ notifications });
        }
      });
  }

  render() {
    return (
      <div className="main">
        <h1>Creuna Dashboard</h1>

        <Notifications items={this.state.notifications} />
      </div>
    );
  }
}

export default Main;
