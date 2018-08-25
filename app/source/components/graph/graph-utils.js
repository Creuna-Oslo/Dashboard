import time from 'js/time-helper';

function getChartProps(data, theme) {
  const points = getPoints(data);
  const maxY = Math.max(...points.map(p => p.y));

  return {
    data: canvas => ({
      datasets: [
        {
          data: points,
          borderColor: getGradient(canvas, points, theme),
          backgroundColor: getGradient(canvas, points, theme, 0.3)
        }
      ]
    }),
    options: {
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 5
        },
        line: {
          borderColor: 'white',
          borderWidth: 2,
          backgroundColor: 'transparent'
        }
      },
      legend: { display: false },
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [
          {
            display: false,
            type: 'linear',
            ticks: { min: time.thisMonth(), max: time.today() }
          }
        ],
        yAxes: [{ display: false, ticks: { max: Math.max(15, maxY) } }]
      }
    }
  };
}

function getPoints(data) {
  // Add point for today if it doesn't exist (avoids clipping on the right side)
  if (!data.hasOwnProperty(time.today())) {
    data[time.today()] = 0;
  }

  // Add point for one month ago if it doesn't exist (avoids clipping on the left side)
  if (!data.hasOwnProperty(time.thisMonth())) {
    data[time.thisMonth()] = 0;
  }

  // Data is an object with timestamps as keys.
  const processedData = Object.entries(data).reduce(
    (accum, [timestamp, value]) => {
      const dayBeforeTime = time.dayBefore(timestamp);
      const dayAfterTime = time.dayAfter(timestamp);

      if (timestamp < time.thisMonth()) {
        // Don't include items older than 30 days
        return accum;
      }

      // Since a repository might not have activity every day, there will be some holes in the data, which will result in the slope of the graph being wrong. To fix this, insert a data point before and/or after each non-zero point, if those points doesn't already exist.
      if (!accum.hasOwnProperty(dayBeforeTime)) {
        Object.assign(accum, { [dayBeforeTime]: 0 });
      }

      if (!accum.hasOwnProperty(dayAfterTime)) {
        Object.assign(accum, { [dayAfterTime]: 0 });
      }

      return Object.assign(accum, { [timestamp]: value });
    },
    {}
  );

  const points = Object.entries(processedData)
    .sort(([key], [otherKey]) => key - otherKey)
    .reduce(
      (accum, [key, value]) =>
        // return 0.3 instead of 0 to avoid graph clipping
        accum.concat({ x: parseInt(key), y: value || 0.3 }),
      []
    );

  return points;
}

function getGradient(canvas, points, theme, alpha = 1) {
  if (!points || !points.length) return 'white';

  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);

  gradient.addColorStop(0, theme.left(alpha));
  gradient.addColorStop(1, theme.right(alpha));

  return gradient;
}

export default {
  getChartProps
};
