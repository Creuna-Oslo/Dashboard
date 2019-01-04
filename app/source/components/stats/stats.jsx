import React from 'react';

import collapseActivity from './collapse-activity';
import firebase from 'js/firebase-helper';
import peakActivity from './peak-activity';

import Card from '../card';
import Graph from '../graph';
import TopStats from '../top-stats';

class Stats extends React.Component {
  static propTypes = {};

  state = {
    projects: [],
    notifications: []
  };

  componentDidMount() {
    firebase.onProjectUpdate(projects => {
      this.setState({ projects });
    });
    firebase.onNotificationByMonth(notifications => {
      this.setState({ notifications });
    });
  }

  render() {
    const activity = collapseActivity(this.state.projects);
    const peak = peakActivity(activity);

    return (
      <div className="stats">
        <Card className="stats-activity-wrapper">
          <h2>Activity (past month)</h2>
          {!!peak.activityCount && (
            <React.Fragment>
              <h3>Peak activity</h3>
              <p>
                <b>{peak.time}</b> with <b>{peak.activityCount}</b>{' '}
                contributions
              </p>
            </React.Fragment>
          )}
          {this.state.projects.length > 0 && (
            <div className="stats-activity">
              <Graph className="stats-activity-graph" data={activity} />
            </div>
          )}
        </Card>

        <TopStats
          notifications={this.state.notifications}
          projects={this.state.projects}
        />
      </div>
    );
  }
}

export default Stats;
