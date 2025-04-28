import useNoteContext from "../hook/useNoteContext.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Note} from "../model/Note.tsx";

type NoteFormProps = {
    onSubmit: (note: Note) => void
}

export default function NoteForm({ onSubmit } : NoteFormProps) {
    const [note, setNote] = useState<Note | null>(null)
    const { editingNote } = useNoteContext()
    
    useEffect(() => {
        if (editingNote) {
            setNote(editingNote)
        }
        if (!editingNote) {
            setNote({
                id: Date.now(),
                title: '',
                text: ''
            })
        }
    }, [editingNote])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        if (!note) return

        setNote({
            ...note,
            [e.currentTarget.name as keyof Note]: e.currentTarget.value
        })
    }

    const handleSubmit = () => {
        if (!note) return
        onSubmit(note)
    }
    
    return (
        <form onSubmit={ handleSubmit }>
            <h1>{ note !== null ? 'Edit note' : 'Add note' }</h1>
            <input
                type="text"
                value={ note?.title || '' }
                name="title"
                onChange={ changeHandler }
            />
            <textarea
                value={ note?.text || '' }
                name="text"
                onChange={ changeHandler }
            />
            <button type="submit">
                Add note
            </button>
        </form>
    )
}