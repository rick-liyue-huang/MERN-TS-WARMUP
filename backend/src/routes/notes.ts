import express from 'express';
import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  getNotesController,
  updateNoteController,
} from '../controllers/notes';

export const notesRouter = express.Router();

notesRouter
  .get('/', getNotesController)
  .get('/:noteId', getNoteByIdController)
  .post('/', createNoteController)
  .patch('/:noteId', updateNoteController)
  .delete('/:noteId', deleteNoteController);
