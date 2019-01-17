import React from 'react';
import PropTypes from 'prop-types';

import color from 'color';

import getOptions from './get-options';

import { Bar } from 'react-chartjs-2';

const red = color('#ea376c');
const yellow = color('#ffeb3b');

const getColor = max => value => red.mix(yellow, value / max).string();

const wrapData = (data, labels) => ({
  datasets: [{ data, backgroundColor: data.map(getColor(Math.max(...data))) }],
  labels
});

const BarGraph = ({ data, labels }) => (
  <div className="bar-graph">
    <Bar data={wrapData(data, labels)} options={getOptions(labels)} />
  </div>
);

BarGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string)
};

export default BarGraph;
