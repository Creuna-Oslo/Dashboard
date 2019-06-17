import time from 'js/time-helper';

const sumActivity = activity =>
  Object.entries(activity).reduce((accumulator, [timeStamp, value]) => {
    return timeStamp > time.thisMonth() ? accumulator + value : accumulator;
  }, 0);

const mostActiveProject = projects =>
  projects.reduce(
    (accumulator, project) => {
      const activityCount = sumActivity(project.activity);

      if (activityCount > accumulator.activityCount) {
        return { name: project.name, activityCount };
      }

      return accumulator;
    },
    { name: '', activityCount: 0 }
  );

const mostActiveUser = notifications => {
  const usersWithActivity = notifications.reduce(
    (accumulator, notification) => {
      const { name } = notification.user;
      return { ...accumulator, [name]: (accumulator[name] || 0) + 1 };
    },
    {}
  );

  return Object.entries(usersWithActivity)
    .sort(([_, countA], [__, countB]) => countB - countA)
    .slice(0, 3)
    .map(([name, activityCount]) => ({ name, activityCount }));
};

const mostOpenIssues = projects =>
  projects.reduce(
    (accumulator, project) => {
      return project.issues > accumulator.issues
        ? { name: project.name, issues: project.issues }
        : accumulator;
    },
    { name: '', issues: 0 }
  );

export default {
  mostActiveProject,
  mostActiveUser,
  mostOpenIssues
};
