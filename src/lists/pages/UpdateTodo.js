import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import './NewTodo.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useSelector } from 'react-redux';

const UpdateTodo = () => {
  const todoId = useParams().todoId;
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedTodo, setLoadedTodo] = useState();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token); //userId din redux

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/todos/${todoId}`
        );
        setLoadedTodo(responseData.todo);

        setFormData(
          {
            title: {
              value: responseData.todo.title,
              isValid: true,
            },
            description: {
              value: responseData.todo.description,
              isValid: true,
            },
            address: {
              value: responseData.todo.adddress,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchTodo();
  }, [sendRequest, todoId, setFormData]);

  const todoUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/todos/${todoId}`,
        'PUT',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      );
      navigate('/');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }
  if (!loadedTodo && isLoading) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      {!isLoading && loadedTodo && (
        <form className='place-form' onSubmit={todoUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title!'
            onInput={inputHandler}
            initialValue={loadedTodo.title}
            initialValid={true}
          />
          <Input
            id='address'
            element='input'
            type='text'
            label='Address'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid address!'
            onInput={inputHandler}
            initialValue={loadedTodo.address}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (minimum 5 characters!'
            onInput={inputHandler}
            initialValue={loadedTodo.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdateTodo;
