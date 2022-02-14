import './App.css';

import React, { useState } from 'react';
import GistHomepage from './components/glist/GistHomepage';
import NotesHomepage from './components/notepad/NotesHomepage';

function App() {
  const [display, setDisplay] = useState('notes');
  return (
    <div className="App">
      <h1 className="title">Notepad Application</h1>
      {display === 'notes' && <NotesHomepage setDisplay={setDisplay} />}
      {display === 'gist' && <GistHomepage setDisplay={setDisplay} />}
    </div>
  );
}

export default App;
