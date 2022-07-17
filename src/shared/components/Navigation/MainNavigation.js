import React, { Fragment, useState } from 'react';
import classes from './MainNavigation.module.css';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={openDrawerHandler} />}
      {/* show prop folosit pentru state managment in sidedrawer */}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        {/* trebuie sa fie cu portals facut */}
        <nav className={classes['main-navigation__drawer-nav']}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className={classes['main-navigation__menu-btn']}
          onClick={openDrawerHandler}
        >
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
