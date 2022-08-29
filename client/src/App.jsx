import { useState } from 'react';
import ButtonRound from './ButtonRound';
import { colorNames } from './ColorPicker';
import Main from './Main';


const lightHoverBg = '#f0f0f0';
const darkHoverBg = '#e9eaea';
const textColor = '#5f6368';

let initialNotes = [
  {
    id: 0,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs',
    color: 'blue',
  },
  {
    id: 1,
    body: 'pay phone bill',
    color: 'gray',
  },
  {
    id: 2,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs',
    color: 'gray',
  },
  {
    id: 4,
    body: 'pay phone bill',
    color: 'pink',
  },
  {
    id: 5,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n',
    color: 'gray',
  },
  {
    id: 6,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs',
    color: 'gray',
  },
  {
    id: 7,
    body: 'pay phone bill',
    color: 'gray',
  },
  {
    id: 8,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n',
    color: 'gray',
  },
  {
    id: 9,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs',
    color: 'pink',
  },
  {
    id: 10,
    body: 'pay phone bill',
    color: 'yellow',
  },
  {
    id: 11,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n',
    color: 'yellow',
  },
  {
    id: 12,
    title: 'Shopping List',
    body: 'eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs milk butter flour eggs',
    color: 'gray',
  },
  {
    id: 13,
    body: 'pay phone bill',
    color: 'blue',
  },
  {
    id: 14,
    title: 'Xmas shopping list',
    body: 'fred\nbob\ngeorge\njorge\n',
    color: 'yellow',
  },
];

let nextId = initialNotes.length;

export default function App() {

  const [notes, setNotes] = useState(initialNotes);
  const [filterColor, setFilterColor] = useState('');

  function onAdd(title, body, color) {
    setNotes([{id: nextId++, title, body, color}, ...notes]);
  }

  function onDelete(id) {
    setNotes(notes.filter(note => (
      note.id !== id
    )));
  }

  // TEMPORARY (use a reducer)
  function setColor(noteId, color) {
    setNotes(notes.map(note => note.id === noteId ? {...note, color} : note));
  }
  
  let filteredNotes = notes.filter(note => filterColor === '' || note.color === filterColor);
  
  return (
    <div className='min-h-screen'>
      <header className="bg-pink-500 py-1 px-3 h-16 text-amber-800 flex flex-row items-center z-10 sticky top-0">
        <ButtonRound size='md'><svg fill="currentColor" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg></ButtonRound>
        <img src='apple-touch-icon.png' alt='logo' width={40} className='ml-8 mr-6' />
        <input type='text' placeholder='Search (not working yet)' className='outline-none focus:bg-gray-300 p-1 text-black'/>
      </header>
      <main className='flex w-full min-h-[calc(100vh-64px)]'>
        <div className='bg-pink-500 w-20 top-16 sticky'>
          <div className='bg-pink-600 fixed top-16'>
            <div className='flex flex-col'>
              <button onClick={() => setFilterColor('')}>all</button>
              {colorNames.map(colorName => (
                <button onClick={() => setFilterColor(colorName)}>{colorName}</button>
              ))}
            </div>
          </div>
        </div>
        <Main notes={filteredNotes} onDelete={onDelete} filterColor={filterColor} setColor={setColor} onAdd={onAdd} />
      </main>
    </div>
  );
}
