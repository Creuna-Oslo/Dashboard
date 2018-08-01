import React from 'react';

import firebase from 'js/firebase-helper';

import Builds from '../builds';
import Notifications from '../notifications';
import Packages from '../packages';

class Main extends React.Component {
  state = {
    builds: [],
    notifications: [],
    packages: []
  };

  componentDidMount() {
    firebase.onBuildStatus(builds => {
      this.setState({ builds });
    });

    firebase.onNotification(notifications => {
      this.setState({ notifications });
    });

    firebase.onPackageUpdate(packages => {
      this.setState({ packages });
    });
  }

  render() {
    return (
      <div className="main">
        <h1>Creuna Dashboard</h1>

        <h2>NPM packages</h2>
        <Packages items={this.state.packages} />

        <h2>Build status</h2>
        <Builds items={this.state.builds} />

        <h2>GitHub activity</h2>
        <Notifications items={this.state.notifications} />
      </div>
    );
  }
}

export default Main;
