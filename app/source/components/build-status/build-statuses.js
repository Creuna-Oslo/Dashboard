import Card from 'components/card';

export default state => {
  if (!state) {
    return {};
  }

  const statuses = {
    errored: {
      icon: 'travis-failed',
      theme: Card.themes.red
    },
    failed: {
      icon: 'travis-failed',
      theme: Card.themes.red
    },
    canceled: {
      icon: 'travis-failed',
      theme: Card.themes.red
    },
    passed: {
      icon: 'travis-passed'
    },
    started: {
      icon: 'travis-started',
      theme: Card.themes.yellow
    }
  };

  return statuses[state] || {};
};
