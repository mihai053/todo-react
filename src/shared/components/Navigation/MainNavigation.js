import React, { Fragment } from 'react';
import classes from './MainNavigation.module.css';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  return (
    <Fragment>
      <SideDrawer>
        <nav className={classes['main-navigation__drawer-nav']}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={classes['main-navigation__menu-btn']}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes['main-navigation__title']}>
          <Link className={classes.link} to='/'>
            Your Todos
          </Link>
        </h1>
        <nav className={classes['main-navigation__header-nav']}>
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
