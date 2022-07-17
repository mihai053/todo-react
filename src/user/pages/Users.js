import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [{ id: 1, name: 'Max', email: 'ceva@ceva.ro', todos: 3 }];

  return <UsersList items={USERS} />;
};
export default Users;
