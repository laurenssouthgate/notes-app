import useNoteContext from "../hook/useNoteContext.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Note} from "../model/Note.tsx";

type NoteFormProps = {
    onSubmit: (note: Note) => void
}

export default function NoteForm({ onSubmit } : NoteFormProps) {
    const [note, setNote] = useState<Note | null>(null)
    const { editingNote, toggleOpen, setEditingNote } = useNoteContext()
    
    useEffect(() => {
        if (editingNote) {
            setNote(editingNote)
        } else {
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

    const handleGoBack = () => {
        setEditingNote(null)
        toggleOpen()
    }
    
    return (
        <form onSubmit={ handleSubmit }>
            <button type="button" onClick={ handleGoBack } >
                Go back
            </button>
            <h1>{ editingNote ? 'Edit note' : 'Add note' }</h1>
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