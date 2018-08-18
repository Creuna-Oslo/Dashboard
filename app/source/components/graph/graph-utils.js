import merge from 'lodash/merge';

import options from './options.json';

function getChartProps(data) {
  const points = getPoints(data);
  const maxX = Math.max(...points.map(p => p.x));
  const minX = Math.min(...points.map(p => p.x));
  const maxY = Math.max(...points.map(p => p.y));

  return {
    data: canvas => ({
      datasets: [
        {
          data: points,
          borderColor: getGradient(canvas, points),
          backgroundColor: getGradient(canvas, points, 0.2)
        }
      ]
    }),
    options: merge(options, {
      scales: {
        xAxes: [{ ticks: { min: minX, max: maxX } }],
        yAxes: [{ ticks: { max: Math.max(10, maxY) } }]
      }
    })
  };
}

function getPoints(data) {
  const todayTime = new Date().setUTCHours(0, 0, 0, 0);

  // Add point for today if it doesn't exist
  if (!data.hasOwnProperty(todayTime)) {
    data[todayTime] = 0;
  }

  // Data is an object with timestamps as keys.
  const processedData = Object.entries(data).reduce((accum, [time, value]) => {
    const dayBeforeTime = time - 60 * 60 * 24 * 1000;
    const lastMonthStartTime = new Date().getTime() - 60 * 60 * 24 * 30 * 1000;

    if (time < lastMonthStartTime) {
      // Don't include items older than 30 days
      return accum;
    }

    // Since a repository might not have activity every day, there will be some holes in the data, which will result in the slope of the graph being wrong. To fix this, insert a data point before each non-zero point, if that point doesn't already exist.
    if (!accum.hasOwnProperty(dayBeforeTime)) {
      return Object.assign(accum, { [dayBeforeTime]: 0, [time]: value });
    }

    return Object.assign(accum, { [time]: value });
  }, {});

  const points = Object.entries(processedData)
    .sort(([key], [otherKey]) => otherKey > key)
    .reduce(
      (accum, [key, value]) =>
        // return 0.1 instead of 0 to avoid graph clipping
        accum.concat({ x: parseInt(key), y: value || 0.1 }),
      []
    );

  return points;
}

function getGradient(canvas, points, alpha = 1) {
  if (!points || !points.length) return 'white';

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);

  gradient.addColorStop(0, `rgba(93, 110, 206, ${alpha})`); // leftmost
  gradient.addColorStop(1, `rgba(111, 238, 255, ${alpha})`); // rightmost

  return gradient;
}

export default {
  getChartProps
};
