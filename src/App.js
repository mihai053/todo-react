import { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
import NewTodo from './lists/pages/NewTodo';
import { Fragment } from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserTodos from './lists/pages/UserTodos';
import UpdateTodo from './lists/pages/UpdateTodo';
import Auth from './user/pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './shared/store/auth-slice';

let logoutTimer;

const App = () => {
  // redux state from store
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // state-ul din redux

  //login is persistent with a token
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          userId: storedData.userId,
          token: storedData.token,
          expirationDate: new Date(storedData.expiration),
        })
      );
    }
  }, [dispatch]); //will only run once when the components mounts

  useEffect(() => {
    if (token) {
      setTimeout(dispatch(authActions.logout()));
    }
  }, [token, dispatch]);

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/todos/new' element={<NewTodo />} />
          <Route path='/:userId/todos' element={<UserTodos />} />
          <Route path='/todos/:todoId' element={<UpdateTodo />} />
          <Route path='/auth' element={<Auth />} />
          {/* {routes} */}
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
