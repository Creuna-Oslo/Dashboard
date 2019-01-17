import React from 'react';
import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
import firebase from 'js/firebase-helper';
import Project from '../project';

const largestKey = obj => Math.max(...Object.keys(obj));

// NOTE: project.activity is an object with timestamps as keys
const sortByActivity = (a, b) =>
  largestKey(b.activity) - largestKey(a.activity);

class Projects extends React.Component {
  state = {
    projects: [],
    projectsWithoutStatus: []
  };

  componentDidMount() {
    this.unsubscribe = firebase.onProjectUpdate(projects => {
      this.setState({
        projects: projects
          .filter(project => project.build || project.npm)
          .sort(sortByActivity),
        projectsWithoutStatus: projects.filter(
          project => !project.build && !project.npm
        )
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
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
