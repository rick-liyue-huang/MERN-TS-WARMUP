import React from 'react';
import { NoteI } from '../models/note';
import { Card } from 'react-bootstrap';
import styles from '../styles/Note.module.css';
import { formatDate } from '../utils/formatDate';

interface NoteCompProps {
  note: NoteI;
  className?: string;
}
export const NoteComp = ({ note, className }: NoteCompProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText = '';

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created: ${formatDate(createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};
