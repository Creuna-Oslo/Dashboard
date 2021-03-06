import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

const themes = {
  grid: 'theme-grid',
  red: 'theme-red',
  yellow: 'theme-yellow'
};

const Card = ({ children, className, theme }) => (
  <div className={cn('card', className, theme)}>
    <div className="card-content">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(themes))),
    PropTypes.oneOf(Object.values(themes))
  ])
};

Card.themes = themes;

export default Card;
