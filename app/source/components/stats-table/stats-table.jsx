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

  fillDataStuff = notifications => {
    let types = {};
    let maxIssues = {};
    Object.keys(notificationTypes).forEach(
      type => (types[type] = new Array(12).fill(0))
    );
    notifications.forEach(notification => {
      var date = new Date(-notification.time);
      var month = date.getMonth();
      types[notification.type][month]++;

      if (
        types[notification.type][month] > maxIssues[notification.type] ||
        !maxIssues[notification.type]
      ) {
        maxIssues[notification.type] = types[notification.type][month];
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
    return (
      <div>
        <Card theme={Card.themes.grid}>
          <h2>{this.props.title}</h2>
          <table className="stats-table">
            <tbody>
              <tr>
                <th />
                {months.map(month => (
                  <th key={month}>{month}</th>
                ))}
              </tr>
              {Object.keys(this.state.types).map(type => (
                <tr key={type}>
                  <th>{type}</th>
                  {this.state.types[type].map(val => (
                    <td className={this.getClass(type, val)}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

export default StatsTable;
