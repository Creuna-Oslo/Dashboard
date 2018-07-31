import React from 'react';
import PropTypes from 'prop-types';

import Build from '../build';

const Builds = ({ items }) => (
  <div className="builds">
    {items.map(item => (
      <Build key={item.id} {...item} />
    ))}
  </div>
);

Builds.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired }))
};

Builds.defaultProps = {
  items: []
};

export default Builds;
