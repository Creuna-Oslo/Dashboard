import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import Icon from '../icon';

const Build = ({ name, state, statusMessage }) => (
  <div className={cn('build', `theme-${state}`)}>
    <div className="build-icon">
      <Icon name={`travis-${state}`} theme={Icon.themes.outline} />
    </div>

    <div className="build-text">
      <h3>{name}</h3>
      <p>{`Build ${statusMessage.toLowerCase()}`}</p>
    </div>
  </div>
);

Build.propTypes = {
  name: PropTypes.string,
  state: PropTypes.string,
  statusMessage: PropTypes.string
};

Build.defaultProps = {
  statusMessage: ''
};

export default Build;
