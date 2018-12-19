import React from 'react';

import firebase from 'js/firebase-helper';

import Notifications from '../notifications';
import Projects from '../projects';

class Main extends React.Component {
  state = {
    notifications: [],
    projects: []
  };

  componentDidMount() {
    firebase.onNotification(notifications => {
      this.setState({ notifications });
    });

    firebase.onProjectUpdate(projects => {
      this.setState({ projects });
    });
  }

  render() {
    return (
      <div className="main">
        <Projects items={this.state.projects} />
        <Notifications items={this.state.notifications} />
      </div>
    );
  }
}

export default Main;
