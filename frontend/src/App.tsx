import React from 'react';
import { NoteI } from './models/note';
import { NoteComp } from './components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import { getNotes, deleteNote } from './network/notes_api';
import { AddNoteModal } from './components/AddNoteModal';
import UtilsStyle from './styles/utils.module.css';

function App() {
  const [notes, setNotes] = React.useState<NoteI[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = React.useState(false);

  React.useEffect(() => {
    async function fetchNotes() {
      try {
        // throw createHttpError(500, 'Server error');
        // const response = await fetch('/api/notes', {
        //   method: 'GET',
        // });
        // const json = await response.json();
        const notes = await getNotes();
        setNotes(notes);
      } catch (err) {
        console.log(err);
        alert('Error fetching notes');
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

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteModal(true)}
        className={`my-2 ${UtilsStyle.blockCenter}`}
      >
        Show Dialog
      </Button>
      <Row xs={1} md={2} xl={3} className='g-2'>
        {notes.map((note) => (
          <Col key={note._id}>
            <NoteComp
              note={note}
              className={styles.note}
              onDeleteClick={() => handleDelete(note)}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteModal && (
        <AddNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSave={(note) => {
            setNotes([...notes, note]);
            setShowAddNoteModal(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
