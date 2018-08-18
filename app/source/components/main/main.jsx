import React from 'react';

import firebase from 'js/firebase-helper';

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
        <h1>Creuna Dashboard</h1>

        <Grid>
          <h2>Projects</h2>
          {this.state.projects.map(project => (
            <Project key={project.name} {...project} />
          ))}

          <div>
            <h2>GitHub activity</h2>
            <Notifications items={this.state.notifications} />
          </div>
        </Grid>
      </div>
    );
  }
}

export default Main;
