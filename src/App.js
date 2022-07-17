import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
import NewTodo from './lists/pages/NewTodo';
import { Fragment } from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' exact element={<Users />} />
          <Route path='/todos/new' exact element={<NewTodo />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
