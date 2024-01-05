import { ConflictError, UnAuthorizedError } from '../errors/http_errors';
import { NoteI } from '../models/note';

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    if (response.status === 401) {
      throw new UnAuthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }
  }
}

export async function getNotes(): Promise<NoteI[]> {
  const response = await fetchData('/api/notes', {
    method: 'GET',
  });
  return response.json();
}

export interface CreateNoteRequestBody {
  title: string;
  text?: string;
}
export async function createNote(note: CreateNoteRequestBody): Promise<NoteI> {
  const response = await fetchData('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`/api/notes/${noteId}`, {
    method: 'DELETE',
  });
}

export async function updateNote(
  nodeId: string,
  note: CreateNoteRequestBody
): Promise<NoteI> {
  const response = await fetchData(`/api/notes/${nodeId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}
