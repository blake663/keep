import { useEffect } from "react";
import { useState } from "react";
import ColorPicker from "./ColorPicker";

export default function NewNoteInput({onAdd, filterColor}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const defaultNoteColor = 'gray';
  const [color, setColor] = useState(filterColor || defaultNoteColor);
  
  function collapseAndClear() {
    setTitle('');
    setBody('');
    setIsExpanded(false);
    const textarea = document.querySelector('#newNoteContainer textarea');
    textarea.style.height = 'auto';
  }

  function handleAdd() {
    if (title || body) {
      onAdd(title, body, color);
    }
    collapseAndClear();
  }

  function handleBodyChange(e) {
    onBodyChange(e);
    console.log('body is ' + body);
    // https://stephanwagner.me/auto-resizing-textarea-with-vanilla-javascript
    const textarea = document.querySelector('#newNoteContainer textarea');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  function onBodyChange(e) {
    if (!isExpanded) {
      setIsExpanded(true);
    } 
    setBody(e.target.value);
  }

  function handleClickSomewhere(e) {
    const newNoteComponent = document.getElementById('newNoteContainer');
    if (newNoteComponent.contains(e.target)) {
      console.log('clicked inside new note component');
    } else {
      console.log('clicked outside new note component');
      handleClickOutside();
    }
  }

  function handleClickOutside() {
    handleAdd();
  }

  useEffect(() => {
    document.addEventListener('click', handleClickSomewhere);
    return () => document.removeEventListener('click', handleClickSomewhere);
  }, [title, body, color]); // has issue without dependencies, from stale closure?

  return (
    <div className="px-4">
      <div 
        id='newNoteContainer' 
        className={"border-[e0e0e0] border rounded-lg max-w-[600px] mx-auto overflow-hidden transition-shadow my-8" + (isExpanded ? ' shadow-main' : ' shadow-[0_0.5px_5px_-1px_grey]')}
        //min-h-[120px]
        >
        {isExpanded && <input placeholder="Title" className="text-lg outline-none block w-full px-[15px] py-[10px]" value={title} onChange={e=>setTitle(e.target.value)} />}
        <div className="grid">
          {/* <span className="block col-start-1 row-start-1 whitespace-pre  px-4 py-3">
            {body}
          </span> */}
          <textarea 
            placeholder="Take a note..."
            className="col-start-1 row-start-1 outline-none px-4 py-3 overflow-auto resize-none"
            cols="30"
            rows="1"
            value={body}
            onChange={handleBodyChange}
            onClick={()=>setIsExpanded(true)}
          />
        </div>
        {isExpanded && 
          <div className="flex justify-between items-center ml-4">
            <ColorPicker color={color} setColor={setColor} />
            <button onClick={()=>handleAdd()} className="ml-auto mr-3 mb-1 block px-5 py-1 hover:bg-slate-50 rounded-sm">Close</button>
          </div>
        }
      </div>
    </div>
  );
}
