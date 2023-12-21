'use client'

import { EditNote } from "@/app/components"
import { useQuery } from "@tanstack/react-query"

async function getNote(userId: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/note/${userId}`)
    const note = await res.json()
    return note
}

export function Edit({ id }: { id: string }) {
    const { data: note, isFetchedAfterMount } = useQuery({
        queryFn: () => getNote(id),
        queryKey: [id]
    })

    return (
        <>
            {isFetchedAfterMount && note ? 
                <EditNote note={note} />
            :
                <div className="blur-effect notes blur-bg"> </div>
            }
        </>
    )
}