const shortDate = dateString =>
  dateString
    .split(' ')
    .slice(1, 3)
    .join(' ');

export default function(activity) {
  const peak = Object.entries(activity).reduce(
    (accumulator, [timeStamp, count]) =>
      count > accumulator.count ? { count, timeStamp } : accumulator,
    { count: 0, timeStamp: 0 }
  );

  return {
    time: shortDate(new Date(parseInt(peak.timeStamp)).toString()),
    activityCount: peak.count
  };
}
