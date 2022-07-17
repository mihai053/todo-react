import React from 'react';
import classes from './UsersItem.module.css';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';

const UsersItem = (props) => {
  return (
    <li className={classes['user-item']}>
      <Card className={classes['user-item__content']}>
        <Link to={`/${props.id}/todos`}>
          <div className={classes['user-item__info']}>
            <h2>{props.name}</h2>
            <h3>
              {props.todosCount} {props.todosCount === 1 ? 'Todo' : 'Todos'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
