import React from 'react';
import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
import firebase from 'js/firebase-helper';
import Project from '../project';

class Projects extends React.Component {
  state = {
    projects: [],
    projectsWithoutStatus: []
  };

  componentDidMount() {
    firebase.onProjectUpdate(projects => {
      this.setState({
        projects: projects.filter(project => project.build || project.npm),
        projectsWithoutStatus: projects.filter(
          project => !project.build && !project.npm
        )
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <FlipMotion className="projects">
          {this.state.projects.map(project => (
            <DebounceRender key={project.name} wait={200}>
              <Project {...project} />
            </DebounceRender>
          ))}
        </FlipMotion>
        <FlipMotion className="projects">
          {this.state.projectsWithoutStatus.map(project => (
            <DebounceRender key={project.name} wait={200}>
              <Project {...project} />
            </DebounceRender>
          ))}
        </FlipMotion>
      </React.Fragment>
    );
  }
}

export default Projects;
