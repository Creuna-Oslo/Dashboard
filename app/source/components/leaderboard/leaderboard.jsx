import React from 'react';
import PropTypes from 'prop-types';

import stats from './leaderboard-stats';

import Card from '../card';

const Leaderboard = ({ projects }) => {
  const project = stats.mostActiveProject(projects);

  return (
    <div className="leaderboard">
      <Card>
        <h2>Leaderboard</h2>
        {!!project.activityCount && (
          <React.Fragment>
            <h3>Most active project</h3>
            <p>
              <b>{project.name}</b> with <b>{project.activityCount}</b>{' '}
              contributions
            </p>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

Leaderboard.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default Leaderboard;
