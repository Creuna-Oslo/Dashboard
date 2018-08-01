import React from 'react';
import PropTypes from 'prop-types';

import Package from '../package';

const Packages = ({ items }) => (
  <div className="packages">
    {items.map(item => (
      <Package key={item.id} {...item} />
    ))}
  </div>
);

Packages.propTypes = {
  items: PropTypes.array
};

Packages.defaultProps = {
  items: []
};

export default Packages;
