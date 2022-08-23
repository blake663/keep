import { forwardRef } from "react"
const Note = forwardRef(({onDelete, title, color, children, classes, style}, ref) => {
  return (
    <div className={'card group rounded-md  w-60 p-2 border border-[#e9e9e9] hover:shadow-card absolute transition-transform duration-200 ease-in-out ' + classes} ref={ref} style={style}>
      {title && <h2 className="p-1 mb-1 font-semibold font-lg">{title}</h2>}
      <div className="max-h-64 overflow-hidden">
        <div className="p-1 whitespace-pre-line">{children}</div>
      </div>
      <div className="h-5 text-green-700 border-1 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
})

export default Note;