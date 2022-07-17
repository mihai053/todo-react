import React from 'react';
import classes from './NavLinks.module.css';
import { Link } from 'react-router-dom';

// fiecare va fi randat later dupa state

const NavLinks = (props) => {
  return (
    <ul className={classes['nav-links']}>
      <li>
        <Link to='/'>All users</Link>
      </li>
      <li>
        <Link to='/1/todos'>My todos</Link>
      </li>
      <li>
        <Link to='/todos/new'>Add todo</Link>
      </li>
      <li>
        <Link to='/auth'>Authatnticate</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
