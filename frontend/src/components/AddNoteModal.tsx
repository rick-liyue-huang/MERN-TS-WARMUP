import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NoteI } from '../models/note';
import { useForm } from 'react-hook-form';
import { CreateNoteRequestBody, createNote } from '../network/notes_api';

interface AddNoteModalProps {
  onDismiss: () => void;
  onNoteSave: (note: NoteI) => void;
}

export const AddNoteModal = ({ onDismiss, onNoteSave }: AddNoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteRequestBody>();

  async function onSubmitted(input: CreateNoteRequestBody) {
    try {
      const noteResponse = await createNote(input);
      onNoteSave(noteResponse);
    } catch (err) {
      console.log(err);
      alert('Error saving note');
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addNoteForm' onSubmit={handleSubmit(onSubmitted)}>
          <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter title'
              isInvalid={!!errors.title}
              {...register('title', { required: true })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter text'
              {...register('text')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='addNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
