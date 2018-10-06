import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

const Link = ({ children, className, url }) => (
  <a className={cn('link', className)} href={url}>
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  url: PropTypes.string
};

export default Link;
