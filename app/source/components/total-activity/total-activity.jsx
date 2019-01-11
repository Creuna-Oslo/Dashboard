import React from 'react';
import PropTypes from 'prop-types';

import collapseActivity from './collapse-activity';
import peakActivity from './peak-activity';

import Card from 'components/card';
import Graph from 'components/graph';

const TotalActivity = ({ projects }) => {
  const activity = collapseActivity(projects);
  const peak = peakActivity(activity);

  return (
    <Card className="total-activity-wrapper" theme={Card.themes.grid}>
      <h2>Activity</h2>
      <p>Past month</p>
      {!!peak.activityCount && (
        <React.Fragment>
          <h3>Peak activity</h3>
          <p>
            <b>{peak.time}</b> with <b>{peak.activityCount}</b> contributions
          </p>
        </React.Fragment>
      )}
      {projects.length > 0 && (
        <div className="total-activity">
          <Graph
            className="total-activity-graph"
            data={activity}
            showTooltips={true}
          />
        </div>
      )}
    </Card>
  );
};

TotalActivity.propTypes = {
  projects: PropTypes.array
};

export default TotalActivity;
