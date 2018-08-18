import Card from '../card';

export default (build = {}) => {
  if (!build.state) {
    return {};
  }

  return {
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
};
