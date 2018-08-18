import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';

import buildStatuses from '../build-status/build-statuses';

import BuildStatus from '../build-status';

const Project = ({ build, issues, name, npm }) => (
  <Card theme={buildStatuses(build.state).theme}>
    <div className="project">
      <h3>{name}</h3>
      <BuildStatus {...build} />
      <p>Issues: {issues}</p>
      {npm && (
        <p>
          NPM: {npm.name} v{npm.version}
        </p>
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
  npm: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string
  })
};

Project.defaultProps = {
  build: {}
};

export default Project;
