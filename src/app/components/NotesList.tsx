'use client'

import { Note } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie"

async function getNotes(userId: string, category: string) {
    const res = await fetch(`http://localhost:4000/api/all-notes/${userId}/${category}`)
    const notes: NoteType[] = await res.json()
    return notes
}

export function NotesList({ category }: { category: string }) {
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    
    // TODO: learn symbol property and get each entity ID as key

    const { data: notes, isFetchedAfterMount } = useQuery<NoteType[]>({
        queryFn: () => getNotes(userId, category),
        queryKey: ['all-notes']
    })

    return (
        <div className="note-list-grid">
            {isFetchedAfterMount && notes?.map((note: NoteType) => (
                <Note 
                    key={note.noteId} 
                    note={note}
                />
            ))}
        </div>
    )
}
