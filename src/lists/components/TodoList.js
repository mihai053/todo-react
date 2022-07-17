import React from 'react';
import classes from './TodoList.module.css';

import Card from '../../shared/components/UIElements/Card';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes['todo-list']} center`}>
        <Card>
          <h2>No todos found. Maybe create one?</h2>
          <button>Share todo</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes['todo-list']}>
      {props.items.map((todo) => {
        <TodoItem key={todo.id} id={todo.id} />;
      })}
    </ul>
  );
};

export default TodoList;
