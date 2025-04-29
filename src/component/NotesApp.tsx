import NotesDisplay from "./NotesDisplay.tsx";
import {NoteContext} from "../context/NoteContext.tsx";
import {useEffect, useState} from "react";
import Header from "./Header.tsx";
import {Note} from "../model/Note.tsx";
import _LocalStorage from "../util/LocalStorage.tsx";
import NoteForm from "./NoteForm.tsx";

export default function NotesApp() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [notes, setNotes] = useState<Note[] | null>(null)
    const [editingNote, setEditingNote] = useState<Note | null>(null)

    useEffect(() => {
        const loadedNotes = _LocalStorage.loadNotes()

        if (loadedNotes !== null) {
            setNotes(loadedNotes)
        }
    }, [])

    const toggleOpen = () => setIsFormOpen(formOpen => !formOpen)

    const contextValues = {
        isFormOpen,
        toggleOpen,
        editingNote,
        setEditingNote
    }

    const handleSubmit = (submittedNote: Note) => {
        if (editingNote) {
            setNotes(notes => {
                if (!notes) return [submittedNote]
                return notes.map(note => note.id === submittedNote.id ? submittedNote : note)
            })
        }

        if (!editingNote) {
            setNotes(notes => {
                if (!notes) return [submittedNote]
                return [...notes, submittedNote]
            })
        }

        if (notes) _LocalStorage.saveNotes(notes)

        setIsFormOpen(false)
        setEditingNote(null)
    }

    return (
        <NoteContext.Provider value={ contextValues }>
            <Header />
            {
                isFormOpen ? (
                    <NoteForm onSubmit={ handleSubmit } />
                ) : (
                    <NotesDisplay notes={ notes } />
                )
            }
        </NoteContext.Provider>
    )
}