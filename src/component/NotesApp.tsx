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
    const deleteNote = (id: number) => {
        if (!notes) return
        const updatedNotes = notes?.filter(note => note.id !== id)
        setNotes(updatedNotes)
        _LocalStorage.saveNotes(updatedNotes)
    }

    const contextValues = {
        isFormOpen,
        toggleOpen,
        editingNote,
        setEditingNote,
        deleteNote
    }

    const handleSubmit = (submittedNote: Note) => {
        if (editingNote) {
            setNotes(notes => {
                const updatedNotes = !notes ? [submittedNote] : notes.map(note => note.id === submittedNote.id ? submittedNote : note)
                _LocalStorage.saveNotes(updatedNotes)
                return updatedNotes
            })
        } else {
            setNotes(notes => {
                const updatedNotes = !notes ? [submittedNote] : [...notes, submittedNote]
                _LocalStorage.saveNotes(updatedNotes)
                return updatedNotes
            })
        }

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