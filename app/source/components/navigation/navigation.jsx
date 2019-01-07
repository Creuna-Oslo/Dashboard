/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from 'react';

import IconButton from '../icon-button';

const NavigationItem = ({ children }) => (
  <div className="navigation-item">{children}</div>
);

const Navigation = () => (
  <div className="navigation">
    <NavigationItem>
      <IconButton url="/stats" icon="graph" />
    </NavigationItem>
    <NavigationItem>
      <IconButton url="/" icon="home" />
    </NavigationItem>
    <NavigationItem>
      <IconButton url="/notifications" icon="zap" />
    </NavigationItem>
  </div>
);

export default Navigation;
