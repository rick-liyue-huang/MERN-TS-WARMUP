import React from 'react';
import { Container } from 'react-bootstrap';
import styles from '../styles/NotesPage.module.css';
import { NotesPageWithLoggedIn } from '../components/NotesPageWithLoggedIn';
import { NotesPageWithLoggedOut } from '../components/NotesPageWithLoggedOut';
import { UserI } from '../models/user';

interface NotePageProps {
  loggedInUser: UserI | null;
}

const NotesPage = ({ loggedInUser }: NotePageProps) => {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageWithLoggedIn /> : <NotesPageWithLoggedOut />}
      </>
    </Container>
  );
};

export default NotesPage;
