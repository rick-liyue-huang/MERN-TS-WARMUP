import { RequestHandler } from 'express';
import { NoteModel } from '../models/note';
import createHttpError from 'http-errors';
import mongoose, { mongo } from 'mongoose';

export const getNotesController: RequestHandler = async (req, res, next) => {
  try {
    // throw Error('Oops!');
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteByIdController: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

interface CreateNoteRequestBody {
  title?: string;
  text?: string;
}

export const createNoteController: RequestHandler<
  unknown,
  unknown,
  CreateNoteRequestBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, 'Title is required');
    }
    const newNote = await NoteModel.create({ title, text });

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};