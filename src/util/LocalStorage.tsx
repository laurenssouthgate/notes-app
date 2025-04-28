import {Note} from "../model/Note.tsx";

export enum StorageKeys {
    NOTES_KEY = 'NOTES'
}

class LocalStorage {
    loadNotes() : Note[] | null {
        const notes = localStorage.getItem(StorageKeys.NOTES_KEY)
        return notes ? JSON.parse(notes) as Note[] : null
    }

    saveNotes(notes: Note[]) {
        localStorage.setItem(StorageKeys.NOTES_KEY, JSON.stringify(notes))
    }

    saveNote(note: Note) {
        const notes = this.loadNotes() || []
        notes.push(note)
        this.saveNotes(notes)
    }
}

const _LocalStorage = new LocalStorage()

export default _LocalStorage