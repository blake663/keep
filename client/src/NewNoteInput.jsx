import { useNewNoteContext } from "./new_note_context";

export default function NewNoteInput({onAdd}) {
  const {title, setTitle, body, setBody, isExpanded, setIsExpanded, collapseAndClear, expand, onBodyChange} = useNewNoteContext();

  function handleAdd() {
    collapseAndClear();
    if (title || body) {
      onAdd(title, body);
    }
  }

  function handleBodyChange(e) {
    onBodyChange(e);
    // https://stephanwagner.me/auto-resizing-textarea-with-vanilla-javascript
    const textarea = document.querySelector('#newNoteContainer textarea');
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  return (
    <div>
      <div 
        id='newNoteContainer' 
        className={"border-[e0e0e0] border rounded-md max-w-[600px] mx-auto overflow-hidden transition-shadow my-8" + (isExpanded ? ' shadow-main' : ' shadow-[0_0.5px_5px_-1px_grey]')}
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
            onClick={expand}
          />
        </div>
        {isExpanded && 
          <div>
            <button onClick={()=>handleAdd()} className="ml-auto mr-3 mb-1 block px-5 py-1 hover:bg-slate-50 rounded-sm">Close</button>
          </div>
        }
      </div>
    </div>
  );
}