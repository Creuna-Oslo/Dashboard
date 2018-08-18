import React from 'react';

import firebase from 'js/firebase-helper';

import FlipMotion from 'react-flip-motion';

import Grid from '../grid';
import Notifications from '../notifications';
import Project from '../project';

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
        <FlipMotion component={Grid}>
          {this.state.projects.map(project => (
            <Project key={project.name} {...project} />
          ))}
        </FlipMotion>

        <div className="notifications">
          <Notifications items={this.state.notifications} />
        </div>
      </div>
    );
  }
}

export default Main;
