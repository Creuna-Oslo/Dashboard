import React from 'react';

import collapseActivity from './collapse-activity';
import firebase from 'js/firebase-helper';

import Card from '../card';
import Graph from '../graph';

class Stats extends React.Component {
  static propTypes = {};

  state = {
    activity: null
  };

  componentDidMount() {
    this.unsubscribe = firebase.onProjectUpdate(projects => {
      this.setState({ activity: collapseActivity(projects) });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="stats">
        <div className="stats-activity-wrapper">
          <Card>
            {this.state.activity && (
              <React.Fragment>
                <h2>Activity (past month)</h2>
                <div className="stats-activity">
                  <Graph
                    className="stats-activity-graph"
                    data={this.state.activity}
                  />
                </div>
              </React.Fragment>
            )}
          </Card>
        </div>
      </div>
    );
  }
}

export default Stats;
