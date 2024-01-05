import React from 'react';
import { TextInputField } from './TextInputField';
import { UserI } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUpRequestBody, signUp } from '../network/user_api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { ConflictError } from '../errors/http_errors';

interface SignupModalProps {
  onDismiss: () => void;
  onSignupSuccessfully: (user: UserI) => void;
}

export const SignupModal = ({
  onDismiss,
  onSignupSuccessfully,
}: SignupModalProps) => {
  const [errorText, setErrorText] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequestBody>();

  async function onSubmitted(input: SignUpRequestBody) {
    try {
      const newUser = await signUp(input);
      onSignupSuccessfully(newUser);
    } catch (err) {
      if (err instanceof ConflictError) {
        setErrorText('Username already exists');
      } else {
        alert('Error signing up');
      }
      console.log(err);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant='danger'>{errorText}</Alert>}
        <Form id='signupForm' onSubmit={handleSubmit(onSubmitted)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Enter username'
            register={register}
            registerOptions={{
              required: 'Username is required',
            }}
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='email'
            placeholder='Enter email'
            register={register}
            registerOptions={{
              required: 'Email is required',
            }}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Enter password'
            register={register}
            registerOptions={{
              required: 'Password is required',
            }}
            error={errors.password}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          type='submit'
          form='signupForm'
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
