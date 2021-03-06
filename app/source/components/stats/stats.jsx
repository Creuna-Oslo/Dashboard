import React from 'react';

import dayName from 'js/day-name';
import firebase from 'js/firebase-helper';

import FlipMotion from 'react-flip-motion';

import PeriodicActivity from 'components/periodic-activity';
import TotalActivity from 'components/total-activity';
import TopStats from '../top-stats';
import StatsTable from '../stats-table';

class Stats extends React.Component {
  static propTypes = {};

  state = {
    projects: [],
    notifications: [],
    notificationsY: []
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
    this.unsubscribeNotifications = firebase.onNotificationByYear(
      notificationsY => {
        this.setState({ notificationsY });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeProjects();
    this.unsubscribeNotifications();
  }

  render() {
    const { notifications, projects, notificationsY } = this.state;

    // NOTE: react-flip-motion for some reason crashes for this component unless children are arrays of components with keys
    return (
      <FlipMotion className="stats">
        {projects.length > 0 &&
        notifications.length > 0 &&
        notificationsY.length > 0
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
              />,
              <StatsTable
                key="year-stats"
                notifications={this.state.notificationsY}
                subtitle="Past year"
                title="Activity by type"
              />
            ]
          : [<div key="empty" />]}
      </FlipMotion>
    );
  }
}

export default Stats;
