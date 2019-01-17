export default labels => ({
  animation: { duration: 0 },
  legend: { display: false },
  maintainAspectRatio: false,
  tooltips: {
    backgroundColor: '#3e4969',
    displayColors: false,
    callbacks: {
      title: ([tooltipItem]) => labels[tooltipItem.index],
      label: ({ yLabel }) => String(yLabel)
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: { color: 'transparent' },
        ticks: { fontColor: 'white' }
      }
    ],
    yAxes: [{ display: false }]
  }
});
