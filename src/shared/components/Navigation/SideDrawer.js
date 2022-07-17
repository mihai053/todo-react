import React from 'react';
import classes from './SideDrawer.module.css';

// componenta pentru mobile
const SideDrawer = (props) => {
  return <aside className={classes['side-drawer']}>{props.children}</aside>;
};

export default SideDrawer;
