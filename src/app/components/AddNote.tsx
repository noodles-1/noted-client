'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function AddNote () {
    const router = useRouter()
    const { user } = useUser()

    const handleAddNote = async () => {
        const res = await fetch(`http://localhost:4000/api/create-note/${user?.id}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        router.push(`/home/edit/${data.noteId}`)
    }

    return (
        <div onClick={handleAddNote}>
            <div className="blur-effect add-note-btn">
                <h1 className="mr-[16px] pr-[16px] border-r-[1px] border-r-gray-700 hidden sm:block"> Add note </h1>
                <img src="/add.png" alt="add-note" />
            </div>
        </div>
    )
}
