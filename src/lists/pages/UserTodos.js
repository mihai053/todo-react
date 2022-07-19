import React, { Fragment, useEffect, useState } from 'react';

import TodoList from '../components/TodoList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserTodos = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedTodos, setLoadedTodos] = useState();
  const userId = useParams().userId; //gets acces to dinamic segment

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/todos/user/${userId}`
        );
        setLoadedTodos(responseData.todos);
      } catch (err) {}
    };
    fetchTodos();
  }, [sendRequest, userId]);

  const todoDeletedHandler = (deletedTodoId) => {
    setLoadedTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== deletedTodoId)
    );
  };

  return (
    <Fragment>
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedTodos && (
        <TodoList
          items={loadedTodos}
          onDeleteTodo={todoDeletedHandler}
        ></TodoList>
      )}
    </Fragment>
  );
};

export default UserTodos;
