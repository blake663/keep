import { createContext, useContext, useState } from "react";

const NewNoteContext = createContext();

export function NewNoteProvider({ children }) {
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  function collapseAndClear() {
    setTitle('');
    setBody('');
    setIsExpanded(false);
    const textarea = document.querySelector('#newNoteContainer textarea');
    textarea.style.height = 'auto';
  }

  function expand() {
    setIsExpanded(true);
  }

  function onBodyChange(e) {
    if (!isExpanded) {
      expand();
    } 
    setBody(e.target.value);
  }

  return (
    <NewNoteContext.Provider value={{title, setTitle, body, setBody, isExpanded, setIsExpanded, collapseAndClear, expand, onBodyChange}}>
      {children}
    </NewNoteContext.Provider>
  );
}

export function useNewNoteContext() {
  return useContext(NewNoteContext);
}