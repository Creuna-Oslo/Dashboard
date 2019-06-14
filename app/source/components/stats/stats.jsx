import React from 'react';

import dayName from 'js/day-name';
import firebase from 'js/firebase-helper';

import FlipMotion from 'react-flip-motion';

import PeriodicActivity from 'components/periodic-activity';
import TotalActivity from 'components/total-activity';
import TopStats from '../top-stats';
import pastActivity from './past-activity';

class Stats extends React.Component {
  static propTypes = {};

  state = {
    projects: [],
    notifications: []
  };

  componentDidMount() {
    this.unsubscribeProjects = firebase.onProjectUpdate(projects => {
      const filteredProjects = pastActivity.pastMonth(projects);
      this.setState({
        projects: filteredProjects
      });
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
              />,
              <PeriodicActivity
                key="activity-hours"
                getInterval={time => new Date(time).getHours()}
                getLabel={time => `${time}:00`}
                notifications={this.state.notifications}
                shiftThreshold={6}
                subtitle="Past month"
                title="Activity by hour"
              />,
              <PeriodicActivity
                key="activity-days"
                getInterval={time => new Date(time).getDay()}
                getLabel={dayName}
                notifications={this.state.notifications}
                shiftThreshold={1}
                subtitle="Past month"
                title="Activity by weekday"
              />
            ]
          : [<div key="empty" />]}
      </FlipMotion>
    );
  }
}

export default Stats;
