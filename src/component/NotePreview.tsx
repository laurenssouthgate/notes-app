import {Note} from "../model/Note.tsx";

type NotePreviewProps = {
    note: Note
}
export default function NotePreview({ note } : NotePreviewProps) {
    return(
        <div className="note-preview" data-id={ note.id }>
            <span className="title">{ note.title }</span>
        </div>
    )
}