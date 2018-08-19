import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

import cn from 'classnames';

import graphUtils from './graph-utils';

const themes = {
  default: {
    canvas: {
      left: alpha => `rgba(93, 110, 206, ${alpha})`,
      right: alpha => `rgba(111, 238, 255, ${alpha})`
    }
  },
  red: {
    className: 'theme-red',
    canvas: {
      left: alpha => `rgba(234, 55, 108, ${alpha})`,
      right: alpha => `rgba(255, 133, 97, ${alpha})`
    }
  },
  yellow: {
    className: 'theme-yellow',
    canvas: {
      left: alpha => `rgba(255, 133, 97, ${alpha})`,
      right: alpha => `rgba(255, 235, 59, ${alpha})`
    }
  }
};

const Graph = ({ data, theme }) => {
  if (Object.keys(data).length < 2) {
    return null;
  }

  return (
    <div className={cn('graph', theme.className)}>
      <Line height={40} {...graphUtils.getChartProps(data, theme.canvas)} />
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
