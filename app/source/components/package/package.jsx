import React from 'react';
import PropTypes from 'prop-types';

import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

const Package = ({ name, version, time }) => (
  <div className="package">
    <h3>{name}</h3>
    <p>{`v${version}`}</p>

    <div className="package-time">
      <span>Published </span>
      <TimeAgo locale="en">{time}</TimeAgo>
    </div>
  </div>
);

Package.propTypes = {
  name: PropTypes.string,
  version: PropTypes.string,
  time: PropTypes.number
};
export default Package;
