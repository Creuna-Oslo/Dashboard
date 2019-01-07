import React from 'react';

import firebase from 'js/firebase-helper';

import FlipMotion from 'react-flip-motion';

import TotalActivity from 'components/total-activity';
import TopStats from '../top-stats';

class Stats extends React.Component {
  static propTypes = {};

  state = {
    projects: [],
    notifications: []
  };

  componentDidMount() {
    this.unsubscribeProjects = firebase.onProjectUpdate(projects => {
      this.setState({ projects });
    });
    this.unsubscribeNotifications = firebase.onNotificationByMonth(
      notifications => {
        this.setState({ notifications });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeProjects();
    this.unsubscribeNotifications();
  }

  render() {
    const { notifications, projects } = this.state;

    // NOTE: react-flip-motion for some reason crashes for this component unless children are arrays of components with keys
    return (
      <FlipMotion className="stats">
        {projects.length > 0 && notifications.length > 0
          ? [
              <TotalActivity
                key="total-activity"
                projects={this.state.projects}
              />,
              <TopStats
                key="top-stats"
                notifications={this.state.notifications}
                projects={this.state.projects}
              />
            ]
          : [<div key="empty" />]}
      </FlipMotion>
    );
  }
}

export default Stats;
