import time from 'js/time-helper';

export default function(projects) {
  return projects
    .map(project => project.activity)
    .reduce((accumulator, activity) => {
      Object.entries(activity)
        .filter(([timeStamp]) => timeStamp >= time.thisMonth())
        .forEach(([timeStamp, count]) => {
          accumulator[timeStamp] = (accumulator[timeStamp] || 0) + count;
        });
      return accumulator;
    }, {});
}
