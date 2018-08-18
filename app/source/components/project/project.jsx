import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';

import buildStatuses from '../build-status/build-statuses';

import BuildStatus from '../build-status';
import Package from '../package';

const Project = ({ build, issues, name, npm }) => (
  <Card theme={buildStatuses(build.state).theme}>
    <div className="project">
      <h3>{name}</h3>
      <p className="project-issues">
        Open issues: <b>{issues}</b>
      </p>
      <hr />
      {build && (
        <div className="project-build">
          <BuildStatus {...build} />
        </div>
      )}
      {npm && (
        <div className="project-package">
          <Package {...npm} />
        </div>
      )}
    </div>
  </Card>
);

Project.propTypes = {
  build: PropTypes.shape({
    branch: PropTypes.string,
    state: PropTypes.string,
    statusMessage: PropTypes.string
  }),
  issues: PropTypes.number,
  name: PropTypes.string,
  npm: PropTypes.object
};

export default Project;
