import React from 'react';
import notificationTypes from '../notification/notification-types';
import PropTypes from 'prop-types';
import Card from 'components/card';
import { months, actionTypes } from '../../js/utils';
import { currentYear, currentMonth } from '../../js/time-helper';

class StatsTable extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
  };

  state = {
    types: {},
    maxIssues: {}
  };

  componentDidMount() {
    this.countActionsPerType(this.props.notifications);
  }

  lastTwelveMonths = () => {
    let currentYear = months.slice(0, currentMonth + 1);
    let prevYear = months.slice(currentMonth + 1);
    return prevYear.concat(currentYear);
  };

  getMonthIndex = index =>
    index >= currentMonth
      ? currentMonth + 11 - index
      : currentMonth - (index + 1);

  countActionsPerType = notifications => {
    let maxIssues = {};
    let types = {};
    Object.keys(notificationTypes).forEach(
      type => (types[type] = new Array(12).fill(0)) //12months, initial count = 0
    );

    notifications.forEach(notification => {
      let month = new Date(-notification.time).getMonth();
      let count = types[notification.type][this.getMonthIndex(month)]++;
      let max = maxIssues[notification.type];

      if (!max || count > max) {
        maxIssues[notification.type] = count;
      }
    });
    this.setState({ maxIssues, types });
  };

  getClass = (type, val) => {
    let percentOfMax = (val / this.state.maxIssues[type]) * 100;
    if (percentOfMax > 80) return 'table-100';
    if (percentOfMax > 60) return 'table-80';
    if (percentOfMax > 40) return 'table-60';
    if (percentOfMax > 20) return 'table-40';
    if (percentOfMax > 0) return 'table-20';
    return 'table-0';
  };

  firstMonthCurrentYear = index => index === months.length - currentMonth - 1;
  showPreviousYearTitle = index => index === 0 && currentMonth !== 0;

  topRowHeaders = () => (
    <tr>
      <th />
      {months &&
        this.lastTwelveMonths().map((month, index) => (
          <React.Fragment key={month}>
            {this.firstMonthCurrentYear(index) && <th className="spacer" />}
            <th key={month}>
              {month}
              {this.showPreviousYearTitle(index) && (
                <div>{currentYear - 1}</div>
              )}
              {this.firstMonthCurrentYear(index) && <div>{currentYear}</div>}
            </th>
          </React.Fragment>
        ))}
    </tr>
  );

  tableBody = types => {
    return Object.keys(types).map(type => (
      <tr key={type}>
        <th>{actionTypes[type]}</th>
        {types[type].map((val, index) => (
          <React.Fragment key={type + index}>
            {this.firstMonthCurrentYear(index) && <td className="spacer" />}
            <td className={this.getClass(type, val)}>{val > 0 ? val : '-'}</td>
          </React.Fragment>
        ))}
      </tr>
    ));
  };

  render() {
    return (
      <div className="stats-table">
        <Card theme={Card.themes.grid}>
          <h2>{this.props.title}</h2>
          <p>{this.props.subtitle}</p>
          <table>
            <tbody>
              {this.topRowHeaders()}
              {this.tableBody(this.state.types)}
            </tbody>
          </table>
          <div className="legend" />
        </Card>
      </div>
    );
  }
}

export default StatsTable;
