import React from 'react';
import PropTypes from 'prop-types';

import Main from '../components/main';

const Layout = ({ children }) => <Main>{children}</Main>;

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;
