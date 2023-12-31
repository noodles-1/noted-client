'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Cookies from "universal-cookie"

async function deleteNotes(userId: string) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/delete-notes', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId })
    })
}

export function EmptyTrash() {
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: deleteNotes,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

    return (
        <div className="delete-hover flex items-center cursor-pointer" onClick={async () => await mutateAsync(userId)}>
            <Image height={22} width={22} src="/delete.png" alt="delete" className="h-[20px] mr-[10px]" />
            <Image height={22} width={22} src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0 h-[20px]" />
            <h1> {isPending ? 'Emptying' : 'Empty trash'} </h1>
        </div>
    )
}