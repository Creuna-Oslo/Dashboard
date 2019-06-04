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

class StatsTable extends React.Component {
  static propTypes = {
    notifications: PropTypes.array,
    title: PropTypes.string
  };

  state = {
    types: {},
    maxIssues: 0
  };

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
    let maxIssues = 0;
    Object.keys(notificationTypes).forEach(
      type => (types[type] = new Array(12).fill(0))
    );

    notifications.forEach(notification => {
      types[notification.type][4]++;
      if (types[notification.type][4] > maxIssues) {
        maxIssues = types[notification.type][4];
      }
    });
    this.setState({ maxIssues, types });
  };

  getClass = val => {
    let percentOfMax = (val / this.state.maxIssues) * 100;
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
                  <th>{month}</th>
                ))}
              </tr>
              {Object.keys(this.state.types).map(type => (
                <tr>
                  <th>{type}</th>
                  {this.state.types[type].map(val => (
                    <td className={this.getClass(val)}>{val}</td>
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
