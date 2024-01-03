import express from 'express';
import {
  createNoteController,
  getNoteByIdController,
  getNotesController,
} from '../controllers/notes';

export const notesRouter = express.Router();

notesRouter
  .get('/', getNotesController)
  .get('/:noteId', getNoteByIdController)
  .post('/', createNoteController);
