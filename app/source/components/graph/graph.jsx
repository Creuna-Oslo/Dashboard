import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import graphUtils from './graph-utils';

const themes = {
  default: {
    left: alpha => `rgba(93, 110, 206, ${alpha})`,
    right: alpha => `rgba(111, 238, 255, ${alpha})`
  },
  red: {
    left: alpha => `rgba(234, 55, 108, ${alpha})`,
    right: alpha => `rgba(255, 133, 97, ${alpha})`
  },
  yellow: {
    left: alpha => `rgba(255, 133, 97, ${alpha})`,
    right: alpha => `rgba(255, 235, 59, ${alpha})`
  }
};

const Graph = ({ data, theme }) => {
  if (Object.keys(data).length < 2) {
    return null;
  }

  return (
    <div className="graph">
      <Line height={40} {...graphUtils.getChartProps(data, theme)} />
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.object,
  theme: PropTypes.oneOf(Object.values(themes))
};

Graph.defaultProps = {
  data: [],
  theme: themes.default
};

Graph.themes = themes;

export default Graph;
