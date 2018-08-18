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

function getOptions(data) {
  const points = getPoints(data);
  const maxX = Math.max(...points.map(p => p.x));
  const minX = Math.min(...points.map(p => p.x));
  const maxY = Math.max(...points.map(p => p.y));

  return {
    animation: {
      duration: 0
    },
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
    scales: {
      xAxes: [
        {
          display: false,
          type: 'linear',
          ticks: { min: minX, max: maxX }
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: { max: Math.max(10, maxY) }
        }
      ]
    },
    tooltips: {
      enabled: false
    }
  };
}

export default {
  getOptions,
  getPoints
};
