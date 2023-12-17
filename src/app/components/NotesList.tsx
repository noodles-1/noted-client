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

    const { data: notes, isFetchedAfterMount } = user ? useQuery<NoteType[]>({
        queryFn: () => getNotes(user.id, category),
        queryKey: ['all-notes']
    }) : { data: null, isFetchedAfterMount: false }

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
