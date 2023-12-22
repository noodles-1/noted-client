'use client'

import { Edit } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { use } from "react";
import Cookies from "universal-cookie";

export default function EditNotePage({ params }: { params: { id: string }}) {
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    let note: NoteType | null = null
    if (userId) {
        const res = use(fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/check-note/${userId}/${params.id}`))
        note = use(res.json())
    }

    if (!note) {
        return (
            <div className="notes blur-effect blur-bg flex items-center justify-center">
                <div className="flex items-center">
                    <h1 className="text-[30px] pr-[20px] mr-[20px] border-r-[1px] border-gray-500"> 404 </h1>
                    <h1> The note you&apos;re looking for cannot be found. </h1>
                </div>
            </div>
        )
    }

    return (
        <Edit id={params.id} />
    )
}
