import React from 'react';
import PropTypes from 'prop-types';

import stats from './leaderboard-stats';

import Card from '../card';

const Leaderboard = ({ notifications, projects }) => {
  const project = stats.mostActiveProject(projects);
  const users = stats.mostActiveUser(notifications);

  return (
    <div className="leaderboard">
      <Card>
        <h2>Leaderboard</h2>
        {!!project.activityCount && (
          <div className="leaderboard-project">
            <h3>Most active project</h3>
            <p>
              <b>{project.name}</b> with <b>{project.activityCount}</b>{' '}
              contributions
            </p>
          </div>
        )}
        {!!users.length && (
          <div className="leaderboard-users">
            <h3>Most activ users</h3>
            {users.map(user => (
              <p key={user.name}>
                <b>{user.name}</b> with <b>{user.activityCount}</b>{' '}
                contributions
              </p>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

Leaderboard.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default Leaderboard;
