import React from 'react';
import notificationTypes from '../notification/notification-types';
import PropTypes from 'prop-types';
import Card from 'components/card';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Desember'
];

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const lastTwelveMonths = () => {
  let currentYear = months.slice(0, currentMonth + 1);
  let prevYear = months.slice(currentMonth + 1);
  return prevYear.concat(currentYear);
};
class StatsTable extends React.Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    title: PropTypes.string
  };

  state = {
    types: {},
    maxIssues: {}
  };

  componentDidMount() {
    this.fillTable(this.props.notifications);
  }

  getMonthIndex = index =>
    index <= currentMonth
      ? index + currentMonth + 1
      : index - (currentMonth + 1);

  fillTable = notifications => {
    let types = {};
    let maxIssues = {};

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
    if (percentOfMax > 80) return 'table-80';
    if (percentOfMax > 60) return 'table-60';
    if (percentOfMax > 40) return 'table-40';
    if (percentOfMax > 20) return 'table-20';
    if (percentOfMax > 0) return 'table-0';
  };

  render() {
    const topRowHeaders = () => (
      <tr>
        <th />
        {lastTwelveMonths().map((month, index) => (
          <React.Fragment>
            {index === currentMonth + 1 && <th className="spacer" />}
            <th key={month}>
              {month}
              {index === 0 && <div>{currentYear - 1}</div>}
              {index === currentMonth + 1 && <div>{currentYear}</div>}
            </th>
          </React.Fragment>
        ))}
      </tr>
    );

    const tableBody = () => (
      <React.Fragment>
        {Object.keys(this.state.types).map(type => (
          <tr key={type}>
            <th>{type}</th>
            {this.state.types[type].map((val, index) => (
              <React.Fragment>
                {index === currentMonth + 1 && <td className="spacer" />}
                <td className={this.getClass(type, val)}>{val}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </React.Fragment>
    );

    return (
      <div>
        <Card theme={Card.themes.grid}>
          <h2>{this.props.title}</h2>
          <table className="stats-table">
            <tbody>
              {topRowHeaders()}
              {tableBody()}
            </tbody>
          </table>
          <div className="legend" />
        </Card>
      </div>
    );
  }
}

export default StatsTable;
