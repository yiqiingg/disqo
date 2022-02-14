import React, { useState, useEffect } from 'react';

import './NotesHomepage.css';
import Note from './Note.js';

const NotesHomepage = () => {
  const [notepadTitle, setNotepadTitle] = useState(
    localStorage.getItem('notepadTitle')
      ? localStorage.getItem('notepadTitle')
      : ''
  );
  const [newNote, setNewNote] = useState({
    id: Math.random(),
    title: '',
    body: '',
  });
  const [notesList, setNotesList] = useState(
    localStorage.getItem('notes')
      ? JSON.parse(localStorage.getItem('notes'))
      : []
  );
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesList));
  }, [notesList]);
  const onChange = (content, location) => {
    console.log(content, location);
    if (location === 'title') {
      setNewNote({ ...newNote, title: content });
    } else if (location === 'body') {
      setNewNote({ ...newNote, body: content });
    }
  };

  const addNewNoteHandler = () => {
    if (!newNote.title) {
      console.log('note title cannot be blank');
    }
    if (!newNote.body) {
      console.log('note body cannot be blank');
    }
    if (notesList && newNote.title && newNote.body) {
      setNotesList([...notesList, { ...newNote }]);
      setNewNote({ id: Math.random(), title: '', body: '' });
    }
    // else {
    //   setNotesList([...notesList, { ...newNote }]);
    //   setNewNote({ title: '', body: '' });
    //   setNewNote({ id: Math.random(), title: '', body: '' });
    // }
    console.log(localStorage.getItem('notes'));
  };

  const deleteNoteHandler = (index) => {
    setNotesList(notesList.filter((note, noteIndex) => noteIndex != index));
    console.log(notesList);
  };
  return (
    <div className="note-container">
      <div>
        <p className="notepad-title">NotepadTitle</p>
        <input
          placeholder="My notepad title..."
          value={notepadTitle}
          onChange={setNotepadTitle}
        />
      </div>
      <div>
        <Note onChange={onChange} noteContent={newNote} />
        <button onClick={addNewNoteHandler}>Add</button>
      </div>
      {notesList.map((note, index) => {
        return (
          <div key={note.id}>
            <Note onChange={onChange} noteContent={note} />;
            <button
              onClick={() => {
                console.log('begin deletion', index);
                deleteNoteHandler(index);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NotesHomepage;
