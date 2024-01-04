import React from 'react';
import { NoteI } from './models/note';
import { NoteComp } from './components/Note';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';

function App() {
  const [notes, setNotes] = React.useState<NoteI[]>([]);

  React.useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const json = await response.json();
        setNotes(json);
      } catch (err) {
        console.log(err);
        alert('Error fetching notes');
      }
    }
    fetchNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className='g-2'>
        {notes.map((note) => (
          <Col key={note._id}>
            <NoteComp note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
