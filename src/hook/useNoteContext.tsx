import {useContext} from "react";
import {NoteContext} from "../context/NoteContext.tsx";

const useNoteContext = () => {
    const noteContext = useContext(NoteContext)

    if (!noteContext) {
        throw new Error('useAppContext must be used within a context provider');
    }

    return noteContext
}

export default useNoteContext