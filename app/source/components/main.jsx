import * as firebase from 'firebase/app';
import 'firebase/database';
// import 'firebase/functions';
import React from 'react';

import firebaseInit from '../../../firebase-init.json';

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
      .on('value', snapshot => {
        this.setState({ notifications: snapshot.val() });
      });
  }

  render() {
    return (
      <div>
        <h1>Creuna Dashboard</h1>
        {this.state.notifications.map(notification => (
          <h3 key={notification}>{notification}</h3>
        ))}
      </div>
    );
  }
}

export default Main;
