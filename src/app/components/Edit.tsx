'use client'

import { useEffect, useState } from "react"
import { EditNote } from "@/app/components"
import { NoteType } from "@/app/interfaces"

export function Edit({ id }: { id: string }) {
    const [note, setNote] = useState<NoteType>()

    useEffect(() => {
        fetch(`http://localhost:4000/api/note/${id}`)
            .then(res => res.json())
            .then((data: NoteType) => {
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