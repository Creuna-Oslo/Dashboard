import React from 'react';

import firebase from 'js/firebase-helper';

import Notifications from '../notifications';

class Main extends React.Component {
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
      <div className="main">
        <h1>Creuna Dashboard</h1>

        <Notifications items={this.state.notifications} />
      </div>
    );
  }
}

export default Main;
