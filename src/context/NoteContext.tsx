import {createContext} from "react";
import {Note} from "../model/Note.tsx";

type NoteContextType = {
    isFormOpen: boolean
    toggleOpen: () => void
    editingNote: Note | null
    setEditingNote: (note: Note | null) => void
}

export const NoteContext = createContext<NoteContextType | undefined>(undefined)
