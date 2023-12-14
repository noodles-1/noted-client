'use client'

import { useEffect, useState } from "react"
import { EditNote } from "@/app/components"
import { Note } from "@/app/interfaces"

export function Edit({ id }: { id: string }) {
    const [note, setNote] = useState<Note>()

    useEffect(() => {
        fetch(`http://localhost:3000/api/note/${id}`)
            .then(res => res.json())
            .then((data: Note) => {
                setNote(data)
            })
    }, [id])

    return (
        <>
            {note ? 
                <EditNote id={id} note={note} />
            :
                <div className="blur-effect notes blur-bg"> </div>
            }
        </>
    )
}