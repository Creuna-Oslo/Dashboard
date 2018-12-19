import React from 'react';
import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
import firebase from 'js/firebase-helper';
import Grid from '../grid';
import Project from '../project';

class Projects extends React.Component {
  state = {
    projects: []
  };

  componentDidMount() {
    firebase.onProjectUpdate(projects => {
      this.setState({ projects });
    });
  }

  render() {
    return (
      <FlipMotion className="projects" component={Grid}>
        {this.state.projects.map(project => (
          <DebounceRender key={project.name} wait={200}>
            <Project {...project} />
          </DebounceRender>
        ))}
      </FlipMotion>
    );
  }
}

export default Projects;
