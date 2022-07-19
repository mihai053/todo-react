import React from 'react';
import classes from './NavLinks.module.css';
import { Link, useNavigate } from 'react-router-dom';
// import { authActions } from '../../store/auth-slice';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
// fiecare va fi randat later dupa state

const NavLinks = (props) => {
  // useDispatch este folosit pentru a apela metodele din slice
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // useSelector este folosit pentru a accesa state-ul din store
  const visibleRoutesLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);

  const onLogoutHandler = () => {
    // nu folosi dispatch intr-un event listener inline pentru ca nu va merge updatat state-ul de redux
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <ul className={classes['nav-links']}>
      <li>
        <Link to='/'>All users</Link>
      </li>
      {visibleRoutesLoggedIn && (
        <li>
          <Link to={`/${userId}/todos`}>My todos</Link>
        </li>
      )}
      {visibleRoutesLoggedIn && (
        <li>
          <Link to='/todos/new'>Add todo</Link>
        </li>
      )}
      {!visibleRoutesLoggedIn && (
        <li>
          <Link to='/auth'>Authenticate</Link>
        </li>
      )}
      {visibleRoutesLoggedIn && (
        <li>
          <button onClick={onLogoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
