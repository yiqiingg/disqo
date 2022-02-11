import React, { useState } from 'react';

import './NotesHomepage.css';

const NotesHomepage = () => {
  return (
    <div className="note-container">
      <p className="notepad-title">NotepadTitle</p>
      <input placeholder="My notepad title ..." />
    </div>
  );
};

export default NotesHomepage;
