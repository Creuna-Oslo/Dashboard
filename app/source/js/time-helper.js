// Returns a time 24 hours earlier than the provided 'time'
const dayBefore = time => {
  return time - 60 * 60 * 24 * 1000;
};

// The time when today started in UTC
const today = () => {
  return new Date().setUTCHours(0, 0, 0, 0);
};

// The time when yesterday started
const yesterday = () => {
  return today() - 60 * 60 * 24 * 1000;
};

// The time when the current month started
const thisMonth = () => {
  return today() - 60 * 60 * 24 * 30 * 1000;
};

export default {
  dayBefore,
  today,
  yesterday,
  thisMonth
};
