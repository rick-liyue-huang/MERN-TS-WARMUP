import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NoteI } from '../models/note';
import { useForm } from 'react-hook-form';
import {
  CreateNoteRequestBody,
  createNote,
  updateNote,
} from '../network/notes_api';

interface AddEditNoteModalProps {
  onDismiss: () => void;
  onNoteSave: (note: NoteI) => void;
  editNote?: NoteI;
}

export const AddEditNoteModal = ({
  onDismiss,
  onNoteSave,
  editNote,
}: AddEditNoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteRequestBody>({
    defaultValues: {
      title: editNote?.title || '',
      text: editNote?.text || '',
    },
  });

  async function onSubmitted(input: CreateNoteRequestBody) {
    try {
      let noteResponse: NoteI;
      if (editNote) {
        noteResponse = await updateNote(editNote._id, input);
      } else {
        noteResponse = await createNote(input);
      }
      onNoteSave(noteResponse);
    } catch (err) {
      console.log(err);
      alert('Error saving note');
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editNote ? 'Edit the Note' : 'Create one Note'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmitted)}>
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
        <Button type='submit' form='addEditNoteForm' disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
