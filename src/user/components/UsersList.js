import React from 'react';
import classes from './UsersList.module.css';
import UsersItem from './UsersItem';
import Card from '../../shared/components/UIElements/Card';

const UsersList = (props) => {
  // check if no users are found
  if (props.items.length === 0) {
    return (
      <div className={classes.center}>
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes['users-list']}>
      {props.items.map((user) => {
        return (
          <UsersItem
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            todosCount={user.todos.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
