const hours = numberOfHours => 60 * 60 * 1000 * numberOfHours;

const days = numberOfDays => hours(24) * numberOfDays;

// Returns a time 24 hours earlier than the provided 'time'
const dayBefore = time => parseInt(time) - hours(24);

// Returns a time 24 hours later than the provided 'time'
const dayAfter = time => parseInt(time) + hours(24);

// The time when today started in UTC
const today = () => new Date().setUTCHours(0, 0, 0, 0);

// The time when yesterday started
const yesterday = () => today() - hours(24);

// The time when tomorrow will start
const tomorrow = () => today() + hours(24);

// The time when the current month started
const thisMonth = () => today() - days(30);

const thisYear = new Date().getFullYear();
// The last 12 months
const lastYear = () =>
  today() - (today() - new Date().setUTCFullYear(thisYear - 1));

// The time since 1st of January this year until now
const thisYearSoFar = () => today() - (today() - Date.UTC(thisYear));

export default {
  dayAfter,
  dayBefore,
  lastYear,
  today,
  tomorrow,
  thisMonth,
  thisYearSoFar,
  yesterday
};
