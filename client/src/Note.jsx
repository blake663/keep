import ColorPicker, { colors } from './ColorPicker';

import { forwardRef } from "react"
import ButtonRound from './ButtonRound';
const Note = forwardRef(({onDelete, title, color, setColor, children, style}, ref) => {
  
  const colorStyle = colors.get(color);
  return (
    <div className={'card group rounded-lg w-60 p-2 border hover:shadow-card absolute transition-transform duration-200 ease-in-out ' + colorStyle} ref={ref} style={style}>
      {title && <h2 className="p-1 mb-1 font-semibold font-lg">{title}</h2>}
      <div className="max-h-64 overflow-hidden">
        <div className="p-1 whitespace-pre-line">{children}</div>
      </div>
      <div className="flex justify-between items-center h-5 text-green-700 border-1 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ColorPicker color={color} setColor={setColor} />
        <ButtonRound size='md' onClick={onDelete}>
          <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDEwLjgwNjY0MSAyIEMgMTAuMjg5NjQxIDIgOS43OTU2ODc1IDIuMjA0MzEyNSA5LjQyOTY4NzUgMi41NzAzMTI1IEwgOSAzIEwgNCAzIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCA0IDUgTCAyMCA1IEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyMCAzIEwgMTUgMyBMIDE0LjU3MDMxMiAyLjU3MDMxMjUgQyAxNC4yMDUzMTIgMi4yMDQzMTI1IDEzLjcxMDM1OSAyIDEzLjE5MzM1OSAyIEwgMTAuODA2NjQxIDIgeiBNIDQuMzY1MjM0NCA3IEwgNS44OTI1NzgxIDIwLjI2MzY3MiBDIDYuMDI0NTc4MSAyMS4yNTM2NzIgNi44NzcgMjIgNy44NzUgMjIgTCAxNi4xMjMwNDcgMjIgQyAxNy4xMjEwNDcgMjIgMTcuOTc0NDIyIDIxLjI1NDg1OSAxOC4xMDc0MjIgMjAuMjU1ODU5IEwgMTkuNjM0NzY2IDcgTCA0LjM2NTIzNDQgNyB6Ij48L3BhdGg+PC9zdmc+"/>            {/* D */}
        </ButtonRound>
      </div>
    </div>
  )
})

export default Note;