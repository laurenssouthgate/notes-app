import NotePreview from "./NotePreview.tsx";
import useNoteContext from "../hook/useNoteContext.tsx";
import {Note} from "../model/Note.tsx";
import addIcon from "../assets/add.svg"
import './NotesDisplay.css'

type NotesDisplayProps = {
    notes: Note[] | null
}

export default function NotesDisplay({ notes } : NotesDisplayProps) {
    const { toggleOpen, setEditingNote } = useNoteContext()

    const clickHandler = () => {
        toggleOpen()
        setEditingNote(null)
    }

    return (
        <div className="notes-window">
            {
                notes !== null &&
                    notes.map(note => (
                        <NotePreview note={ note } />
                    ))
            }
            <button type="button" className="add-note-btn" onClick={ clickHandler }>
                <img src={ addIcon } alt="Add note" width={ 30 } />
            </button>
        </div>
    )
}