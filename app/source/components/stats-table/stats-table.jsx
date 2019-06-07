import React from 'react';
import notificationTypes from '../notification/notification-types';
import PropTypes from 'prop-types';
import Card from 'components/card';
import { utc } from 'moment';

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

const getMonths = () => {
  let currentMonth = new Date().getMonth();
  let currentYear = months.slice(0, currentMonth + 1);
  let prevYear = months.slice(currentMonth + 1);
  return prevYear.concat(currentYear);
};

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

class StatsTable extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    title: PropTypes.string
  };

  state = {
    types: {},
    maxIssues: {}
  };

  componentDidUpdate() {}
  componentDidMount() {
    this.fillDataStuff(this.props.notifications);
  }

  fillTable = Object.keys(this.state.types).map(type => (
    <tr>
      <th>{type}</th>
      {this.state.types[type].map(val => (
        <td>{val}</td>
      ))}
    </tr>
  ));

  coolIndex = index => {
    let currentMonth = new Date().getMonth();
    let newIndex;
    if (index <= currentMonth) {
      newIndex = index + currentMonth + 1;
    } else {
      newIndex = index - (currentMonth + 1);
    }
    return newIndex;
  };

  fillDataStuff = notifications => {
    let types = {};
    let maxIssues = {};
    Object.keys(notificationTypes).forEach(
      type => (types[type] = new Array(12).fill(0))
    );
    notifications.forEach(notification => {
      var date = new Date(-notification.time);
      var month = date.getMonth();
      types[notification.type][this.coolIndex(month)]++;

      if (
        types[notification.type][this.coolIndex(month)] >
          maxIssues[notification.type] ||
        !maxIssues[notification.type]
      ) {
        maxIssues[notification.type] =
          types[notification.type][this.coolIndex(month)];
      }
    });
    this.setState({ maxIssues, types });
  };

  getClass = (type, val) => {
    let percentOfMax = (val / this.state.maxIssues[type]) * 100;
    if (percentOfMax > 80) return 'purple';
    if (percentOfMax > 60) return 'blue';
    if (percentOfMax > 40) return 'green';
    if (percentOfMax > 20) return 'yellow';
    if (percentOfMax > 0) return 'red';
  };

  render() {
    const topRowHeaders = () => (
      <tr>
        <th />
        {getMonths().map((month, index) => (
          <React.Fragment>
            {index === currentMonth + 1 && <th class="spacer" />}
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
      <tbody>
        {Object.keys(this.state.types).map(type => (
          <tr key={type}>
            <th>{type}</th>
            {this.state.types[type].map((val, index) => (
              <React.Fragment>
                {index === currentMonth + 1 && <td class="spacer" />}
                <td className={this.getClass(type, val)}>{val}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    );

    return (
      <div>
        <Card theme={Card.themes.grid}>
          <h2>{this.props.title}</h2>
          <table className="stats-table">
            {topRowHeaders}
            {tableBody}
          </table>
        </Card>
      </div>
    );
  }
}

export default StatsTable;
