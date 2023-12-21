'use client'

import { Note } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie"

async function getNotes(userId: string, category: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/all-notes/${userId}/${category}`)
    const notes: NoteType[] = await res.json()
    return notes
}

export function NotesList({ category }: { category: string }) {
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    
    const { data: notes, isFetchedAfterMount } = useQuery<NoteType[]>({
        queryFn: () => getNotes(userId, category),
        queryKey: ['all-notes']
    })

    return ( 
        <>
            {notes?.length == 0 && 
                <div className="w-full h-[85%] flex justify-center items-center text-gray-300">
                    {category === 'all' && (
                        <h1 className="flex items-center"> 
                            Click
                            <img src="/add.png" alt="add" className="inline-block h-[12px] mx-[6px] opacity-70" />
                            to add a new note
                        </h1>
                    )}
                    {category === 'pinned' && (
                        <h1 className="flex items-center"> 
                            Press
                            <img src="/home-pinned.png" alt="home-pinned" className="inline-block h-[14px] mx-[6px] opacity-70" />
                            to pin a note
                        </h1>
                    )}
                </div>
            }
            <div className="note-list-grid">
                {isFetchedAfterMount && notes?.map((note: NoteType) => (
                    <Note 
                        key={note.noteId} 
                        note={note}
                    />
                ))}
            </div>
        </>
    )
}
