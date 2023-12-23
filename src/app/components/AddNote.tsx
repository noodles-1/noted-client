'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"

export function AddNote () {
    const router = useRouter()
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    const handleAddNote = async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/create-note', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: userId })
        })
        const data = await res.json()
        router.push(`/home/edit/${data.noteId}`)
    }

    return (
        <div onClick={handleAddNote}>
            <div className="blur-effect add-note-btn">
                <h1 className="mr-[16px] pr-[16px] border-r-[1px] border-r-gray-700 hidden sm:block"> Add note </h1>
                <Image height={100} width={100} src="/add.png" alt="add-note" />
            </div>
        </div>
    )
}
