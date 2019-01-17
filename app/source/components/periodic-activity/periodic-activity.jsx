import React from 'react';
import PropTypes from 'prop-types';

import pipe from '@creuna/utils/pipe';

import { map, reduce } from 'js/array';

import BarGraph from 'components/bar-graph';
import Card from 'components/card';

// NOTE: timestamps are negative
const groupByInterval = getInterval => (accumulator, { time }) => ({
  ...accumulator,
  [getInterval(-time)]: (accumulator[getInterval(-time)] || 0) + 1
});

const shiftPoints = threshold => points =>
  points
    .filter(([time]) => time >= threshold)
    .concat(points.filter(([time]) => time < threshold));

const PeriodicActivity = ({
  getInterval,
  getLabel,
  notifications,
  shiftThreshold,
  subtitle,
  title
}) => {
  const points = pipe(
    notifications,
    reduce(groupByInterval(getInterval), {}),
    Object.entries,
    map(map(Number)), // NOTE: Nested map because of nested arrays
    shiftPoints(shiftThreshold)
  );

  const peak = points.reduce((peak, point) =>
    point[1] > peak[1] ? point : peak
  );

  return (
    <div className="periodic-activity">
      <Card theme={Card.themes.grid}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <h3>Peak activity</h3>
        <p>
          <b>{getLabel(peak[0])}</b> with <b>{peak[1]}</b> contributions
        </p>
        <div className="periodic-activity-graph">
          <BarGraph
            data={points.map(([_, count]) => count)}
            labels={points.map(([time]) => getLabel(time))}
          />
        </div>
      </Card>
    </div>
  );
};

PeriodicActivity.propTypes = {
  getInterval: PropTypes.func, // Number -> Number. Groups times into intervals (like `time => new Date(time).getHours()`).
  getLabel: PropTypes.func, // Number -> String. Formats the x axis labels for each column
  notifications: PropTypes.arrayOf(PropTypes.shape({ time: PropTypes.number })),
  shiftThreshold: PropTypes.number, // Shifts points that have an x axis value below 'shiftThreshold' to the end of the array
  subtitle: PropTypes.string,
  title: PropTypes.string
};

PeriodicActivity.defaultProps = {
  getInterval: time => time,
  getLabel: String,
  shiftThreshold: 0
};

export default PeriodicActivity;
