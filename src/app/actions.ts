'use server'

import { NoteType } from "@/app/interfaces"
import { revalidateTag } from "next/cache"

const updateNote = async (updatedNote: any) => {
    await fetch('http://localhost:4000/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
        cache: 'no-store'
    })
}

export const handleUnpin = async (note: NoteType) => {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'all',
        modified: note.modified
    }

    await updateNote(updatedNote)
    revalidateTag('all-notes')
}

export const handlePin = async (note: NoteType) => {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'pinned',
        modified: note.modified
    }

    await updateNote(updatedNote)
    revalidateTag('all-notes')
}


export const handleDelete = async (note: NoteType) => {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'deleted',
        modified: note.modified
    }

    await updateNote(updatedNote)
    revalidateTag('all-notes')
}