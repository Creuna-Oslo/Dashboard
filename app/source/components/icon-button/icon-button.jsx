import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';

const IconButton = ({ disabled, icon, onClick, url }) => {
  const Element = url ? 'a' : 'button';

  return (
    <Element
      className="icon-button"
      disabled={disabled}
      href={url}
      onClick={onClick}
    >
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
