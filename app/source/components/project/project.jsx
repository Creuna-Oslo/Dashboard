import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card';

import buildStatuses from '../build-status/build-statuses';

import BuildStatus from '../build-status';
import Graph from '../graph';
import Package from '../package';

const Project = ({ activity, build, issues, name, npm }) => (
  <Card theme={buildStatuses(build.state).theme}>
    <div className="project">
      <h3>{name}</h3>
      {issues ? (
        <p className="project-issues">
          Open issues: <b>{issues}</b>
        </p>
      ) : (
        <p className="project-issues">No open issues! ✨</p>
      )}
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
      {activity && (
        <React.Fragment>
          <hr />
          <div className="project-activity">
            <p>Activity</p>
            <Graph data={activity} />
          </div>
        </React.Fragment>
      )}
    </div>
  </Card>
);

Project.propTypes = {
  activity: PropTypes.object,
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
