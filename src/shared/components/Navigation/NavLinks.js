import React from 'react';
import classes from './NavLinks.module.css';
import { NavLink } from 'react-router-dom';

// fiecare va fi randat later dupa state

const NavLinks = (props) => {
  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to='/' exact>
          All users
        </NavLink>
      </li>
      <li>
        <NavLink to='/1/todos'>My todos</NavLink>
      </li>
      <li>
        <NavLink to='/todos/new'>Add todo</NavLink>
      </li>
      <li>
        <NavLink to='/auth'>Authatnticate</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
