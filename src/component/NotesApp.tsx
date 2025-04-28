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

    const handleSubmit = () => {

    }

    return (
        <NoteContext.Provider value={ contextValues }>
            <Header />
            {
                isFormOpen ? (
                    <NoteForm />
                ) : (
                    <NotesDisplay notes={ notes } />
                )
            }
        </NoteContext.Provider>
    )
}