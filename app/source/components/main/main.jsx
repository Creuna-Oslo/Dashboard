import React from 'react';

import firebase from 'js/firebase-helper';

import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
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
            <DebounceRender key={project.name} wait={200}>
              <Project {...project} />
            </DebounceRender>
          ))}
        </FlipMotion>

        <Notifications items={this.state.notifications} />
      </div>
    );
  }
}

export default Main;
