import { useState, useRef, useEffect } from "react";
import NewNoteInput from './NewNoteInput';
import Note from './Note';


export default function Main({ filterColor='', setColor, notes, onDelete, onAdd }) {

  const [heights, setHeights] = useState({});
  const [numColumns, setNumColumns] = useState();
  const wrapperRef = useRef();
  const notesContainerRef = useRef();
  const positionsRef = useRef(new Map());
  const noteRefs = useRef(new Map());
  const [leftMargin, setLeftMargin] = useState(0);

  const gap = 16, noteWidth = 240;

  function findNumColumns() {
    const total = wrapperRef.current.clientWidth;
    const newNumColumns = Math.floor((total - gap) / (noteWidth + gap));
    console.log('called find num columns');
    setNumColumns(newNumColumns);
    setLeftMargin((total - newNumColumns * noteWidth - (newNumColumns - 1) * gap) / 2);
  }
  
  useEffect(() => {
    findNumColumns();
    window.addEventListener('resize', findNumColumns);
    return () => window.removeEventListener('resize', findNumColumns);
  }, [])

  useEffect(() => {
    console.log('useEffect triggered');
    for (const {id} of notes) {
      if (heights[id] === undefined || heights[id] === 0) {
        const clientHeight = noteRefs.current.get(id).clientHeight;
        if (clientHeight) {
          setHeights(heights => ({...heights, [id]: clientHeight}));
        } else {
          debugger
        }
      }
    }
  }, [numColumns, notes])

  function calculatePositions() {
    const columnHeights = Array(numColumns);
    columnHeights.fill(0);
    for (const {id} of notes) {
      let minHeight = Infinity, minPos;
      for (let col = 0; col < numColumns; col++) {
        if (columnHeights[col] < minHeight) {
          minPos = col; minHeight = columnHeights[col];
        }
      }

      positionsRef.current.set(id, [(noteWidth+gap) * minPos + leftMargin, minHeight]); // Doesn't need to be a ref; should just be local scoped variable
      // console.log(noteRefs.current);
      if (heights[id])
      columnHeights[minPos] += heights[id] + gap;
    }

    // There should be a better place for this logic
    if (notesContainerRef.current) {
      notesContainerRef.current.style.minHeight = Math.max(...columnHeights) + 'px';
      console.log('set notes container min-height to ' + Math.max(...columnHeights));
    }
  }

  calculatePositions();

  function handleDelete(id) {
    onDelete(id);
    setHeights(oldHeights => {
      const newHeights = {...oldHeights};
      delete newHeights[id];
      return newHeights;
    })
  }

  return <>
    <div ref={wrapperRef} className='flex-1'>
      <NewNoteInput onAdd={onAdd} filterColor={filterColor} />
      <div ref={notesContainerRef} className='mx-auto' >
        {notes.map(({id, title, body, color}) => {
          const position = positionsRef.current.get(id);
          if (position) {
            var style = {transform: `translate(${position[0]}px, ${position[1]}px)`}
          } else {
            var style = {visibility: 'hidden'};
          }
          return <Note onDelete={()=>handleDelete(id)} title={title} style={style} key={id} color={color} setColor={c => setColor(id, c)}
            ref={node => {
              if (node) {
                noteRefs.current.set(id, node);
              } else {
                noteRefs.current.delete(id);
              }
            }}
          >
            {body}
          </Note>}
        )}
      </div>
    </div>
  </>
}