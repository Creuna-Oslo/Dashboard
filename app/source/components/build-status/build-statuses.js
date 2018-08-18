import Card from 'components/card';
import Graph from 'components/graph';

export default state => {
  if (!state) {
    return {};
  }

  const statuses = {
    errored: {
      icon: 'travis-failed',
      theme: Card.themes.red,
      graphTheme: Graph.themes.red
    },
    failed: {
      icon: 'travis-failed',
      theme: Card.themes.red,
      graphTheme: Graph.themes.red
    },
    canceled: {
      icon: 'travis-failed',
      theme: Card.themes.red,
      graphTheme: Graph.themes.red
    },
    passed: {
      icon: 'travis-passed'
    },
    started: {
      icon: 'travis-started',
      theme: Card.themes.yellow,
      graphTheme: Graph.themes.yellow
    }
  };

  return statuses[state] || {};
};
