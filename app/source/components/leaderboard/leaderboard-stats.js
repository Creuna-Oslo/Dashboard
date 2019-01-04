import time from 'js/time-helper';

const mostActiveProject = projects =>
  projects.reduce(
    (accumulator, project) => {
      const activityCount = Object.entries(project.activity).reduce(
        (accumulator, [timeStamp, value]) => {
          return timeStamp > time.thisMonth()
            ? accumulator + value
            : accumulator;
        },
        0
      );

      if (activityCount > accumulator.activityCount) {
        return { name: project.name, activityCount };
      }

      return accumulator;
    },
    { name: '', activityCount: 0 }
  );

export default {
  mostActiveProject
};
