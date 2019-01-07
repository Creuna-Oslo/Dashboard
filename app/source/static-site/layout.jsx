import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../components/navigation';

const Layout = ({ children }) => (
  <React.Fragment>
    <Navigation />
    {children}
  </React.Fragment>
);

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;
