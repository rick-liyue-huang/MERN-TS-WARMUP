import React from 'react';
import { TextInputField } from './form/TextInputField';
import { UserI } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUpRequestBody, signUp } from '../network/user_api';
import { Button, Form, Modal } from 'react-bootstrap';

interface SignupModalProps {
  onDismiss: () => void;
  onSignupSuccessfully: (user: UserI) => void;
}

export const SignupModal = ({
  onDismiss,
  onSignupSuccessfully,
}: SignupModalProps) => {
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
      console.log(err);
      alert('Error signing up');
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
