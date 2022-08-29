export default function ColorPicker({ color: currentColor, setColor: setCurrentColor }) {

  function handleChange(e) {
    setCurrentColor(e.target.value);
  }

  return (
    <select value={currentColor} onChange={handleChange} className='outline-none'>
      {colorNames.map(color => (
        <option value={color} selected={color===currentColor}>{color}</option>
      ))}
    </select>
  );
};

// Keep's white note border color : #e9e9e9

export const colors = new Map([
  ['gray',  ' bg-[#ddd] border-[#ccc]'],
  ['pink',   ' bg-[#e6a] border-[#d69]'],
  ['yellow', ' bg-[#dd9] border-[#cc8]'],
  ['blue',   ' bg-[#2af] border-[#29e]'],
]);

export const colorNames = [
'gray',
'pink',
'yellow',
'blue',
];