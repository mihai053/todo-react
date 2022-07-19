import React from 'react';
import classes from './TodoList.module.css';

import Card from '../../shared/components/UIElements/Card';
import TodoItem from './TodoItem';
import Button from '../../shared/components/FormElements/Button';
const TodoList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes['todo-list']} center`}>
        <Card>
          <h2>No todos found. Maybe create one?</h2>
          <Button to='places/new'>Share todo</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes['todo-list']}>
      {props.items.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            address={todo.address}
            cretorId={todo.creatorId}
            onDelete={props.onDeleteTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
