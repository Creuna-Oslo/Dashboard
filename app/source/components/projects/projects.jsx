import React from 'react';
import PropTypes from 'prop-types';
import FlipMotion from 'react-flip-motion';

import DebounceRender from '../debounce-render';
import Grid from '../grid';
import Project from '../project';

const Projects = ({ items }) => (
  <FlipMotion className="projects" component={Grid}>
    {items.map(project => (
      <DebounceRender key={project.name} wait={200}>
        <Project {...project} />
      </DebounceRender>
    ))}
  </FlipMotion>
);

Projects.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Project.propTypes))
};

Projects.defaultProps = {
  items: []
};

export default Projects;
