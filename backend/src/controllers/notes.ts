import { RequestHandler } from 'express';
import { NoteModel } from '../models/note';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { assertIsDefined } from '../utils/assertIsDefined';

export const getNotesController: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    // throw Error('Oops!');
    // throw createHttpError(401);
    assertIsDefined(authenticatedUserId);
    const notes = await NoteModel.find({
      userId: authenticatedUserId,
    }).exec();
    res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNoteByIdController: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, 'You are not authorized to access this note');
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    if (!title) {
      throw createHttpError(400, 'Title is required');
    }
    const newNote = await NoteModel.create({
      title,
      text,
      userId: authenticatedUserId,
    });

    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

interface UpdateNoteParams {
  noteId: string;
}
interface UpdateNoteRequestBody {
  title?: string;
  text?: string;
}

export const updateNoteController: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteRequestBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, text } = req.body;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    if (!title) {
      throw createHttpError(400, 'Missing Title fields');
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, 'You are not authorized to access this note');
    }

    if (title) {
      note.title = title;
    }
    if (text) {
      note.text = text;
    }

    await note.save();

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
};

interface DeleteNoteParams {
  noteId: string;
}
export const deleteNoteController: RequestHandler<
  DeleteNoteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note ID');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(403, 'You are not authorized to access this note');
    }

    await NoteModel.findByIdAndDelete(noteId).exec();

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
