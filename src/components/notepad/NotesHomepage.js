import React, { useState, useEffect } from 'react';

import './NotesHomepage.css';
import Note from './Note.js';

const NotesHomepage = (props) => {
  const { setDisplay } = props;
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
    console.log('notes updated', notesList);
    // localStorage.setItem('notes', JSON.stringify(notesList));
  }, [notesList, setNotesList]);

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
    console.log(localStorage.getItem('notes'));
  };

  const deleteNoteHandler = (index) => {
    setNotesList(notesList.filter((note, noteIndex) => noteIndex != index));
    console.log(notesList);
  };

  const editNoteHandler = (index, content, type) => {
    let editedNote = [...notesList];
    editedNote[index][type] = content;
    console.log(editedNote);
    setNotesList(editedNote);
  };

  const saveNotesToStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notesList));
    localStorage.setItem('notepadTitle', notepadTitle);
  };

  const deleteNotepad = () => {
    localStorage.removeItem('notes');
    localStorage.removeItem('notepadTitle');
    setNewNote({
      id: Math.random(),
      title: '',
      body: '',
    });
    setNotepadTitle('');
    setNotesList([]);
  };

  return (
    <div className="note-container">
      <div>
        <p className="notepad-title">NotepadTitle</p>
        <input
          placeholder="My notepad title..."
          value={notepadTitle}
          onChange={(e) => setNotepadTitle(e.target.value)}
        />
      </div>
      <button onClick={() => setDisplay('gist')}>View Stats</button>
      <button onClick={saveNotesToStorage}>Save</button>
      <button onClick={deleteNotepad}>Delete</button>
      <div>
        <Note onChange={onChange} noteContent={newNote} />
        <button onClick={addNewNoteHandler}>Add</button>
      </div>
      {notesList.map((note, index) => {
        console.log(note);
        return (
          <div key={note.id}>
            <Note
              key={note.id + 1}
              onChange={(content, type) =>
                editNoteHandler(index, content, type)
              }
              noteContent={note}
            />
            ;
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
