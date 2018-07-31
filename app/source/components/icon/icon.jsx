import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import icons from '../../assets/icons/icons';

const themes = {
  outline: 'theme-outline'
};

const Icon = ({ className, name, theme }) =>
  icons[name]
    ? React.createElement(icons[name], {
        className: cn('icon', theme, className),
        focusable: 'false'
      })
    : null;

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(icons)).isRequired,
  theme: PropTypes.oneOf(Object.values(themes))
};

Icon.themes = themes;

export default Icon;
