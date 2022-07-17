import './App.css';
import { Routes, Route } from 'react-router-dom';
import Users from './user/pages/Users';
import NewList from './lists/pages/NewList';
import { Fragment } from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' exact element={<Users />} />
          <Route path='/todos/new' exact element={<NewList />} />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
