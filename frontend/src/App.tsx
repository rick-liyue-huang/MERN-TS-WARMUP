import React from 'react';
import { NoteI } from './models/note';
import { NoteComp } from './components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import { getNotes, deleteNote } from './network/notes_api';
import { AddEditNoteModal } from './components/AddEditNoteModal';
import UtilsStyle from './styles/utils.module.css';

function App() {
  const [notes, setNotes] = React.useState<NoteI[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = React.useState(false);
  const [noteToEdit, setNoteToEdit] = React.useState<NoteI | null>(null);
  const [notesLoading, setNotesLoading] = React.useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] =
    React.useState(false);

  React.useEffect(() => {
    async function fetchNotes() {
      try {
        // throw createHttpError(500, 'Server error');
        // const response = await fetch('/api/notes', {
        //   method: 'GET',
        // });
        // const json = await response.json();
        setShowNotesLoadingError(false);
        setNotesLoading(true);

        const notes = await getNotes();
        setNotes(notes);
      } catch (err) {
        console.log(err);
        // alert('Error fetching notes');
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    fetchNotes();
  }, []);

  async function handleDelete(note: NoteI) {
    try {
      await deleteNote(note._id);
      setNotes(notes.filter((n) => n._id !== note._id));
    } catch (err) {
      console.log(err);
      alert('Error deleting note');
    }
  }

  const notesRow = (
    <Row xs={1} md={2} xl={3} className={`g-2 ${styles.noteRow}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <NoteComp
            note={note}
            className={styles.note}
            onDeleteClick={() => handleDelete(note)}
            onNoteEdit={(note) => setNoteToEdit(note)}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={styles.notesPage}>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        className={`my-2 ${UtilsStyle.blockCenter}`}
      >
        Show Dialog
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary' />}
      {showNotesLoadingError && <div>Error loading notes</div>}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesRow : <div>No notes show </div>}</>
      )}
      {showAddNoteModal && (
        <AddEditNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSave={(note) => {
            setNotes([...notes, note]);
            setShowAddNoteModal(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteModal
          onDismiss={() => setNoteToEdit(null)}
          onNoteSave={(note) => {
            setNotes(notes.map((n) => (n._id === note._id ? note : n)));
            setNoteToEdit(null);
          }}
          editNote={noteToEdit}
        />
      )}
    </Container>
  );
}

export default App;
