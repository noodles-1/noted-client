'use client'

import { Note } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

async function getNotes(userId: string, category: string) {
    const res = await fetch(`http://localhost:4000/api/all-notes/${userId}/${category}`)
    const notes: NoteType[] = await res.json()
    return notes
}

export function NotesList({ category }: { category: string }) {
    const { user } = useUser()

    if (!user)
        return <h1> Loading... </h1>

    const { data: notes, isFetchedAfterMount } = useQuery<NoteType[]>({
        queryFn: () => getNotes(user.id, category),
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
