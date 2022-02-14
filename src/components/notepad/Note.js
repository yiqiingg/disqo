import React, { useState, useEffect } from 'react';

import './Note.css';

const Note = (props) => {
  const { onChange, noteContent } = props;
  const [inputValue, setInputValue] = useState({});
  useEffect(() => {
    setInputValue({ ...noteContent });
  }, [noteContent]);
  return (
    <div>
      <div>
        <input
          className="note"
          placeholder="Enter note title..."
          onChange={(e) => {
            onChange(e.target.value, 'title');
          }}
          maxLength={255}
          minLength={1}
          value={inputValue.title}
        />
        <textarea
          onChange={(e) => onChange(e.target.value, 'body')}
          className="note"
          rows="4"
          placeholder="Enter note..."
          value={noteContent.body}
        />
      </div>
    </div>
  );
};

export default Note;
