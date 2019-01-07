import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Icon from '../icon';
import internalPaths from '../../static-site/pages/paths';

const IconButton = ({ disabled, icon, onClick, url }) => {
  const isNavLink = internalPaths.includes(url);
  const Element = isNavLink ? NavLink : 'button';
  const props = isNavLink
    ? {
        activeClassName: 'icon-button-active',
        exact: true,
        to: url
      }
    : {
        disabled,
        onClick
      };

  return (
    <Element className="icon-button" {...props}>
      <Icon name={icon} />
    </Element>
  );
};

IconButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  url: PropTypes.string
};

export default IconButton;
