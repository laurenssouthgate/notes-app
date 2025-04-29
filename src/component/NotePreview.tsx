import {Note} from "../model/Note.tsx";
import useNoteContext from "../hook/useNoteContext.tsx";

type NotePreviewProps = {
    note: Note
}
export default function NotePreview({ note } : NotePreviewProps) {
    const { setEditingNote, toggleOpen } = useNoteContext()

    const handleClick = () => {
        setEditingNote(note)
        toggleOpen()
    }

    return(
        <div className="note-preview" data-id={ note.id } onClick={ handleClick }>
            <span className="title">{ note.title }</span>
            <span className="text">
                {
                    note.text.length < 50 ?
                       note.text : note.text.substring(0, Math.min(note.text.length, 50)).trim() + '...'
                }
            </span>
        </div>
    )
}