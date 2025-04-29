import {Note} from "../model/Note.tsx";
import useNoteContext from "../hook/useNoteContext.tsx";
import './NotePreview.css'
import {useState} from "react";
import viewIcon from "../assets/view.svg"
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete.svg"

type NotePreviewProps = {
    note: Note
}
export default function NotePreview({ note } : NotePreviewProps) {
    const [hovering, setHovering] = useState<boolean>(false)
    const { setEditingNote, toggleOpen } = useNoteContext()

    const handleEdit = () => {
        setEditingNote(note)
        toggleOpen()
    }
    return(
        <div className="note-preview"
             data-id={ note.id }
             data-hovering={ hovering }
             onMouseEnter={ () => setHovering(true) }
             onMouseLeave={ () => setHovering(false)}>
            <span className="title">{ note.title }</span>
            <span className="text">
                {
                    note.text.length < 50 ?
                       note.text : note.text.substring(0, Math.min(note.text.length, 100)).trim() + '...'
                }
            </span>
            {
                hovering &&
                <div className="note-btns">
                    <button type="button">
                        <img src={ viewIcon } alt="View Note" width={ 16 } />
                    </button>
                    <button type="button" onClick={ handleEdit }>
                        <img src={ editIcon } alt="Edit Note" width={ 16 }/>
                    </button>
                    <button type="button">
                        <img src={ deleteIcon } alt="Delete Note" width={ 16 }/>
                    </button>
                </div>
            }
        </div>
    )
}