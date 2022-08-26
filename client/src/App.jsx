import { useEffect } from 'react';
import { useRef, useState } from 'react';
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

  const [notesData, setNotesData] = useState(initialNotesData);
  const [heights, setHeights] = useState({});
  const {title, body, collapseAndClear} = useNewNoteContext();

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
    setLeftMargin((total - newNumColumns * (noteWidth + gap) - gap) / 2);
  }
  
  useEffect(() => {
    findNumColumns();
    window.addEventListener('resize', findNumColumns);
    return () => window.removeEventListener('resize', findNumColumns);
  }, [])

  useEffect(() => {
    console.log('useEffect triggered');
    debugger
    for (const {id} of notesData) {
      if (heights[id] === undefined || heights[id] === 0) {
        const clientHeight = noteRefs.current.get(id).clientHeight;
        if (clientHeight) {
          setHeights(heights => ({...heights, [id]: clientHeight}));
        } else {
          debugger
        }
      }
    }
  }, [numColumns, notesData])

  function calculatePositions() {
    const columnHeights = Array(numColumns);
    columnHeights.fill(0);
    for (const {id} of notesData) {
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

    // There's obviously a better place for this
    if (notesContainerRef.current) {
      notesContainerRef.current.style.minHeight = Math.max(...columnHeights) + 'px';
      console.log('set notes container min-height to ' + Math.max(...columnHeights));
    }
  }

  calculatePositions();

  
  function onAdd(title, body) {
    setNotesData([{id: nextId++, title: title, body: body}, ...notesData]);
  }

  function onDelete(id) {
    setNotesData(notesData.filter(noteData => (
      noteData.id !== id
    )));
    setHeights(oldHeights => {
      const newHeights = {...oldHeights};
      delete newHeights[id];
      return newHeights;
    })
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
        <div className='bg-pink-500 w-20 top-16 sticky'>
          <div className='bg-pink-600 fixed top-16'>
            <ul>
              <li>a</li>
              <li>b</li>
              <li>c</li>
            </ul>
          </div>
        </div>
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
