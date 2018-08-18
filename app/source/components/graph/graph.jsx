import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import graphUtils from './graph-utils';

const Graph = ({ data }) => {
  if (Object.keys(data).length < 2) {
    return null;
  }

  return (
    <div className="graph">
      <Line height={40} {...graphUtils.getChartProps(data)} />
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.object
};

Graph.defaultProps = {
  data: []
};

export default Graph;
