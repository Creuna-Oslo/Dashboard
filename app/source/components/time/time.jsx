import React from 'react';
import PropTypes from 'prop-types';

import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
JavascriptTimeAgo.locale(en);

import TimeAgo from 'react-time-ago/no-tooltip';

const Time = ({ time }) => (
  <span className="time">
    <TimeAgo locale="en">{time}</TimeAgo>
  </span>
);

Time.propTypes = {
  time: PropTypes.number
};

export default Time;
