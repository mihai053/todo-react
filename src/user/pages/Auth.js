import React, { useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { authActions } from '../../shared/store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import './Auth.css';

const Auth = () => {
  // dispacth folosit pentru a accesa metodele din reducer
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  // const [error, setError] = useState();
  // the error state is for an eventualy error modal shown to the user
  const { isLoading, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        dispatch(
          authActions.login({
            userId: responseData.userId,
            token: responseData.token,
          })
        );
        navigate('/');
      } catch (error) {
        console.log(error);
        // setError(error.message || 'Something went wrong, please try again');
      }
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        dispatch(
          authActions.login({
            userId: responseData.userId,
            token: responseData.token,
          })
        );
        navigate('/');
      } catch (error) {
        console.log(error);

        // setError(error.message || 'Something went wrong, please try again');
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid,
        formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: '', isValid: false } },
        false
      );
    }

    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Card className='authentication'>
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />

      <form onSubmit={authSubmitHandler}>
        {' '}
        {!isLogin && (
          <Input
            element='input'
            id='name'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name'
            onInput={inputHandler}
          />
        )}
        <Input
          id='email'
          element='input'
          type='email'
          label='E-mail'
          validators={[VALIDATOR_EMAIL]}
          errorText='Please enter a valid email'
          onInput={inputHandler}
        />
        <Input
          id='password'
          element='input'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid password, at least 5 characters'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          {isLogin ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
