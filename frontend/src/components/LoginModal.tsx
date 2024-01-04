import React from 'react';
import { UserI } from '../models/user';
import { useForm } from 'react-hook-form';
import { LoginRequestBody, login } from '../network/user_api';
import { Button, Form, Modal } from 'react-bootstrap';
import { TextInputField } from './form/TextInputField';

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessfully: (user: UserI) => void;
}

export const LoginModal = ({
  onDismiss,
  onLoginSuccessfully,
}: LoginModalProps) => {
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
      console.log(err);
      alert('Error signing up');
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='loginForm'>
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
