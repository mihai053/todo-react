import React, { Fragment } from 'react';

import classes from './TodoItem.module.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import { useSelector } from 'react-redux';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// de vazut de ce nu merge css-ul
// confirmDeteleHandler pentru a sterge din baza (o sa facem request)
const TodoItem = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const { isLoading, sendRequest } = useHttpClient();

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/todos/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <li className={classes['place-item']}>
      <Card className={classes['place-item__content']}>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className={classes['place-item__info']}>
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes['place-item__actions']}>
          {isLoggedIn && (
            <Fragment>
              <Button to={`/todos/${props.id}`}>Edit</Button>
              <Button danger onClick={confirmDeleteHandler}>
                Delete
              </Button>
            </Fragment>
          )}
        </div>
      </Card>
    </li>
  );
};

export default TodoItem;
