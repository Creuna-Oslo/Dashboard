import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';
import Time from '../time';

const Package = ({ version, time }) => (
  <div className="package">
    <div className="package-icon">
      <Icon name="npm" />
    </div>
    <div className="package-text">
      <div className="package-version">{version}</div>
      <div>
        <span className="package-published-text">Published</span>{' '}
        <Time time={time} />
      </div>
    </div>
  </div>
);

Package.propTypes = {
  version: PropTypes.string,
  time: PropTypes.number
};
export default Package;
