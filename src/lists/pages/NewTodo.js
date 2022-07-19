import React, { Fragment } from 'react';

import './NewTodo.css';
import Input from '../../shared/components/FormElements/Input';
import { useNavigate } from 'react-router-dom';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const NewTodo = () => {
  const { isLoading, sendRequest } = useHttpClient();

  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
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

  // console.log(token);
  const todoSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        'http://localhost:5000/api/todos',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      );
      navigate('/');
    } catch (err) {}
  };

  return (
    <Fragment>
      <form className='place-form' onSubmit={todoSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title!'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          type='text'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address!'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid text!'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD TODO
        </Button>
      </form>
    </Fragment>
  );
};

export default NewTodo;
