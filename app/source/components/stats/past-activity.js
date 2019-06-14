import time from 'js/time-helper';

const pastActivity = (projects, time) =>
  projects.map(project => ({
    ...project,
    activity: Object.entries(project.activity).reduce(
      (acc, [timeStamp, count]) => {
        if (timeStamp >= time) acc[timeStamp] = count;
        return acc;
      },
      {}
    )
  }));

export default {
  pastMonth: projects => pastActivity(projects, time.thisMonth())
};
