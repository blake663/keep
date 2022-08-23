import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import NewNoteInput from './NewNoteInput';
import { useNewNoteContext } from './new_note_context';
import Note from './Note';


const lightHoverBg = '#f0f0f0';
const darkHoverBg = '#e9eaea';
const textColor = '#5f6368';

function Button({size, hoverColor, children, onClick}) {
  return (
    <button 
      className={'flex justify-center items-center rounded-full p-2.5' +
        {sm: ' h-8 w-8', md: ' h-12 w-12'}[size] +
        ' hover:bg-[#fff4]'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

let nextId = 15;

let initialNotesData = [
  {
    id: 0,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs'
  },
  {
    id: 1,
    body: 'pay phone bill'
  },
  {
    id: 2,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n'
  },
  {
    id: 3,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs'
  },
  {
    id: 4,
    body: 'pay phone bill'
  },
  {
    id: 5,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n'
  },
  {
    id: 6,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs'
  },
  {
    id: 7,
    body: 'pay phone bill'
  },
  {
    id: 8,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n'
  },
  {
    id: 9,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs'
  },
  {
    id: 10,
    body: 'pay phone bill'
  },
  {
    id: 11,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n'
  },
  {
    id: 12,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs'
  },
  {
    id: 13,
    body: 'pay phone bill'
  },
  {
    id: 14,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n'
  },
];

function App() {

  const [notesData, setNotesData] = useState(initialNotesData); // give them a height field in a useEffect
  const {title, body, collapseAndClear} = useNewNoteContext();

  const [numColumns, setNumColumns] = useState();
  const wrapperRef = useRef();
  const notesContainerRef = useRef();
  const positionsRef = useRef(new Map());
  const noteRefs = useRef(new Map());


  const gap = 8, noteWidth = 240;

  function findNumColumns() {
    const total = wrapperRef.current.clientWidth;
    const newNumColumns = Math.floor((total - gap) / (noteWidth + gap));
    console.log('called find num columns');
    setNumColumns(newNumColumns);
  }
  
  useEffect(() => {
    findNumColumns();
    window.addEventListener('resize', findNumColumns);
    return () => window.removeEventListener('resize', findNumColumns);
  }, [])

  useEffect(() => {
    console.log('useEffect triggered');
    debugger
    for (const note of notesData) {
      if (!note.height) {
        const clientHeight = noteRefs.current.get(note.id).clientHeight;
        if (clientHeight) {
          setNotesData(nd => nd.map(n => (
            n.id === note.id ?
              {...n, height: clientHeight} :
              n
          )));
        } else {
          debugger
        }
      }
    }
    // iterate through notes, id -> ref, add height if missing with setState(old => new)
  })

  function calculatePositions() {
    const columnHeights = Array(numColumns);
    columnHeights.fill(0);
    for (const note of notesData) {
      let minHeight = Infinity, minPos;
      for (let col = 0; col < numColumns; col++) {
        if (columnHeights[col] < minHeight) {
          minPos = col; minHeight = columnHeights[col];
        }
      }

      positionsRef.current.set(note.id, [(noteWidth+gap) * minPos, minHeight]); // Doesn't need to be a ref; should just be local scoped variable
      // console.log(noteRefs.current);
      if (note.height)
      columnHeights[minPos] += note.height + gap;
    }
  }

  calculatePositions();

  
  function onAdd(title, body) {
    setNotesData([...notesData, {id: nextId++, title: title, body: body}]);
  }

  function onDelete(id) {
    setNotesData(notesData.filter(noteData => (
      noteData.id !== id
    )))
  }

  function clickSomewhere(e) {
    const newNoteComponent = document.getElementById('newNoteContainer');
    if (newNoteComponent.contains(e.target)) {
      console.log('clicked inside');
    } else {
      console.log('clicked outside');
      collapseAndClear();
      if (title || body) {
        onAdd(title, body);
      }
    }
  }


  return (
    <div className='min-h-screen' onClick={clickSomewhere}>
      <header className="bg-pink-500 p-1 h-16 text-amber-800 flex flex-row items-center z-10 sticky top-0">
        <Button size='md'><svg fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></Button>
        <Button size='sm'><svg fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></Button>
        <img className='w-10' src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' alt='logo'></img>
        search, reload, {numColumns}
      </header>
      <main className='flex w-full min-h-[calc(100vh-64px)]'>
        <div className='bg-pink-500 w-20 top-16 sticky'></div>
        <div ref={wrapperRef} className='flex-1'>
          <NewNoteInput onAdd={onAdd}/>
          <div ref={notesContainerRef} className='mx-auto' >
            {notesData.map(({id, title, body}) => {
              const position = positionsRef.current.get(id);
              if (position) {
                var style = {transform: `translate(${position[0]}px, ${position[1]}px)`}
              } else {
                var style = {visibility: 'hidden'};
              }
              return <Note onDelete={()=>onDelete(id)} title={title} style={style} key={id}
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
      </main>
    </div>
  );
}

export default App;
