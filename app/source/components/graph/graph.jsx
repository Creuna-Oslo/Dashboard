import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';

import graphUtils from './graph-utils';

class Graph extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: []
  };

  state = {
    showGraph: true
  };

  componentDidUpdate(prevProps) {
    const didChange = Object.keys(prevProps).some(
      key => this.props[key] !== prevProps[key]
    );

    if (didChange) {
      // Unmount and mount graph again to force repaint
      this.setState({ showGraph: false }, () => {
        this.setState({ showGraph: true });
      });
    }
  }

  getGradient = (canvas, points, alpha = 1) => {
    if (!points || !points.length) return 'white';

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);

    gradient.addColorStop(0, `rgba(93, 110, 206, ${alpha})`); // leftmost
    gradient.addColorStop(1, `rgba(111, 238, 255, ${alpha})`); // rightmost

    return gradient;
  };

  getChartData = canvas => {
    const points = graphUtils.getPoints(this.props.data);
    return {
      datasets: [
        {
          data: points,
          borderColor: this.getGradient(canvas, points),
          backgroundColor: this.getGradient(canvas, points, 0.2)
        }
      ]
    };
  };

  render() {
    if (!this.state.showGraph || Object.keys(this.props.data).length < 2) {
      return null;
    }

    return (
      <div className="graph">
        <Line
          data={this.getChartData}
          height={40}
          options={graphUtils.getOptions(this.props.data)}
        />
      </div>
    );
  }
}

export default Graph;
