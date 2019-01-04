export default function(projects) {
  return projects
    .map(project => project.activity)
    .reduce((accumulator, activity) => {
      Object.entries(activity).forEach(([timeStamp, count]) => {
        accumulator[timeStamp] = (accumulator[timeStamp] || 0) + count;
      });
      return accumulator;
    }, {});
}
