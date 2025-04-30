import useNoteContext from "../hook/useNoteContext.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Note} from "../model/Note.tsx";
import backArrow from '../assets/go-back.svg'
import './NoteForm.css'

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
        <form
            className='note-form'
            onSubmit={ handleSubmit }>
            <button type="button" onClick={ handleGoBack } className="go-back-btn">
                <img src={ backArrow } alt="Go back" width={ 16 } />
            </button>
            <h1>{ editingNote ? 'Edit note' : 'Add note' }</h1>
            <input
                type="text"
                value={ note?.title || '' }
                name="title"
                placeholder="Title"
                onChange={ changeHandler }
                required={ true }
            />
            <textarea
                value={ note?.text || '' }
                name="text"
                placeholder="Text"
                onChange={ changeHandler }
                required={ true }
            />
            <button type="submit">
                Add note
            </button>
        </form>
    )
}