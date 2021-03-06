import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';
import Link from '../link';
import Time from '../time';

const Package = ({ time, url, version }) => (
  <Link url={url} className="package">
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
  </Link>
);

Package.propTypes = {
  time: PropTypes.number,
  url: PropTypes.string,
  version: PropTypes.string
};
export default Package;
