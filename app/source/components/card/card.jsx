import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

const themes = {
  yellow: 'theme-yellow',
  red: 'theme-red'
};

const Card = ({ children, theme }) => (
  <div className={cn('card', theme)}>{children}</div>
);

Card.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOf(Object.values(themes))
};

Card.themes = themes;

export default Card;
