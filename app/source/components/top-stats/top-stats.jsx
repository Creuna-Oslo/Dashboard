import React from 'react';
import PropTypes from 'prop-types';

import stats from './leaderboard-stats';

import Card from '../card';

const TopStats = ({ notifications, projects }) => {
  const issues = stats.mostOpenIssues(projects);
  const project = stats.mostActiveProject(projects);
  const users = stats.mostActiveUser(notifications);

  return (
    <div className="top-stats">
      <Card>
        <h2>Top things</h2>
        {!!project.activityCount && (
          <div className="top-stats-project">
            <h3>Most active project</h3>
            <p>
              <b>{project.name}</b> with <b>{project.activityCount}</b>{' '}
              contributions
            </p>
          </div>
        )}

        {!!issues.issues && (
          <div className="top-stats-issues">
            <h3>Most open issues</h3>
            <p>
              <b>{issues.name}</b> with <b>{issues.issues}</b> open issues
            </p>
          </div>
        )}

        {!!users.length && (
          <div className="top-stats-users">
            <h3>Most activ people</h3>
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

TopStats.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default TopStats;
