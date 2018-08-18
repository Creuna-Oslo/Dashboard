import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';

import buildStatuses from './build-statuses';

const Project = ({ build, issues, name }) => (
  <Card theme={buildStatuses[build.state].theme}>
    <div className="project">
      <h3>{name}</h3>
      <p>Build {build.statusMessage.toLowerCase()}</p>
      <p>Issues: {issues}</p>
    </div>
  </Card>
);

Project.propTypes = {
  build: PropTypes.shape({
    state: PropTypes.string,
    statusMessage: PropTypes.string
  }),
  issues: PropTypes.number,
  name: PropTypes.string
};

export default Project;
