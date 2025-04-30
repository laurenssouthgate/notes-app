import {Note} from "../model/Note.tsx";
import useNoteContext from "../hook/useNoteContext.tsx";
import './NotePreview.css'
import React, {useState, useEffect} from "react";
import editIcon from "../assets/edit.svg"
import deleteIcon from "../assets/delete.svg"

type NotePreviewProps = {
    note: Note
}
export default function NotePreview({ note } : NotePreviewProps) {
    const [hovering, setHovering] = useState<boolean>(false)
    const { setEditingNote, toggleOpen, deleteNote } = useNoteContext()

    const handleEdit = () => {
        setEditingNote(note)
        toggleOpen()
    }

    const handleDelete = () => {
        deleteNote(note.id)
    }

    const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setHovering(true)
    }

    useEffect(() => {
        const handleDocumentTouch = () => {
            setHovering(false)
        }

        document.addEventListener('touchstart', handleDocumentTouch)
        return () => {
            document.removeEventListener('touchstart', handleDocumentTouch)
        }
    }, [])

    return(
        <div className="note-preview"
             data-id={ note.id }
             data-hovering={ hovering }
             onMouseEnter={ () => setHovering(true) }
             onMouseLeave={ () => setHovering(false) }
             onTouchStart={ handleTouch }
        >
            <div className="padding-container">
                <span className="title">{note.title}</span>
                <span className="text">
                {
                    note.text.length < 50 ?
                        note.text : note.text.substring(0, Math.min(note.text.length, 100)).trim() + '...'
                }
                </span>
            </div>
            {
                hovering &&
                <div className="note-btns">
                    <button type="button" onClick={handleEdit}>
                        <img src={editIcon} alt="Edit Note" width={16}/>
                    </button>
                    <button type="button" onClick={ handleDelete }>
                        <img src={ deleteIcon } alt="Delete Note" width={ 16 }/>
                    </button>
                </div>
            }
        </div>
    )
}