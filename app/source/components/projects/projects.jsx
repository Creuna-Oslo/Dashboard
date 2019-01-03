import React from 'react';
import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
import firebase from 'js/firebase-helper';
import Project from '../project';

class Projects extends React.Component {
  state = {
    projects: []
  };

  componentDidMount() {
    firebase.onProjectUpdate(projects => {
      const sortedProjects = projects.sort((a, b) => {
        if ((a.build || a.npm) && !(b.build || b.npm)) {
          return -1;
        }

        return b.build || b.npm ? 1 : 0;
      });

      this.setState({ projects: sortedProjects });
    });
  }

  render() {
    return (
      <FlipMotion className="projects">
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
