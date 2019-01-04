import React from 'react';

import collapseActivity from './collapse-activity';
import firebase from 'js/firebase-helper';

import Card from '../card';
import Graph from '../graph';
import Leaderboard from '../leaderboard';

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
    return (
      <div className="stats">
        <div className="stats-activity-wrapper">
          <Card>
            {this.state.projects.length > 0 && (
              <React.Fragment>
                <h2>Activity (past month)</h2>
                <div className="stats-activity">
                  <Graph
                    className="stats-activity-graph"
                    data={collapseActivity(this.state.projects)}
                  />
                </div>
              </React.Fragment>
            )}
          </Card>
        </div>
        <Leaderboard
          notifications={this.state.notifications}
          projects={this.state.projects}
        />
      </div>
    );
  }
}

export default Stats;
