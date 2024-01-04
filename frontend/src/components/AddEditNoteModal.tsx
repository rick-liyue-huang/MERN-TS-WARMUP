import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NoteI } from '../models/note';
import { useForm } from 'react-hook-form';
import {
  CreateNoteRequestBody,
  createNote,
  updateNote,
} from '../network/notes_api';
import { TextInputField } from './form/TextInputField';

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
          {/*
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
  */}

          <TextInputField
            label='Title'
            name='title'
            register={register}
            registerOptions={{ required: true }}
            error={errors.title}
            type='text'
            placeholder='Enter title'
          />

          {/*
          <Form.Group className='mb-3'>
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Enter text'
              {...register('text')}
            />
          </Form.Group>

*/}

          <TextInputField
            label='Content'
            name='text'
            register={register}
            as='textarea'
            rows={5}
            placeholder='Enter text'
          />
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
