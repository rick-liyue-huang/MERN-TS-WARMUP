import React from 'react';
import { UserI } from '../models/user';
import { useForm } from 'react-hook-form';
import { LoginRequestBody, login } from '../network/user_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { TextInputField } from './TextInputField';
import { UnAuthorizedError } from '../errors/http_errors';

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessfully: (user: UserI) => void;
}

export const LoginModal = ({
  onDismiss,
  onLoginSuccessfully,
}: LoginModalProps) => {
  const [errorText, setErrorText] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestBody>();

  async function onSubmitted(input: LoginRequestBody) {
    try {
      const user = await login(input);
      onLoginSuccessfully(user);
    } catch (err) {
      if (err instanceof UnAuthorizedError) {
        setErrorText('Invalid username or password');
      } else {
        alert('Error logging in');
      }
      console.log(err);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant='danger'>{errorText}</Alert>}
        <Form id='loginForm' onSubmit={handleSubmit(onSubmitted)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            register={register}
            registerOptions={{
              required: 'Username is required',
            }}
            error={errors.username}
            placeholder='Enter username'
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            register={register}
            registerOptions={{
              required: 'Password is required',
            }}
            error={errors.password}
            placeholder='Enter password'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          type='submit'
          form='loginForm'
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
