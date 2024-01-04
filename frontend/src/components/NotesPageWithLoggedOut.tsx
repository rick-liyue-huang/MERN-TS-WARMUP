import React from 'react';

export const NotesPageWithLoggedOut = () => {
  return (
    <div>
      <h1>Notes Page</h1>
      <p>
        This is the notes page. You can only see this page if you are logged in.
      </p>
      <p>
        If you are logged in, you should see a list of notes. You can add a
        note, edit a note, or delete a note.
      </p>
      <p>
        If you are logged out, you should see a message saying "You must be
        logged in to see this page".
      </p>
    </div>
  );
};
