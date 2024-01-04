import React from 'react';
import { NoteI } from '../models/note';
import { Card } from 'react-bootstrap';
import styles from '../styles/Note.module.css';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';
import utilsStyle from '../styles/utils.module.css';

interface NoteCompProps {
  note: NoteI;
  onDeleteClick: (note: NoteI) => void;
  className?: string;
}
export const NoteComp = ({ note, className, onDeleteClick }: NoteCompProps) => {
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
        <Card.Title className={utilsStyle.flexCenter}>
          {title}{' '}
          <MdDelete
            className='text-muted'
            onClick={(e) => {
              onDeleteClick(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>{createdUpdatedText}</Card.Footer>
    </Card>
  );
};
