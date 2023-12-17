import { Edit } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { auth } from "@clerk/nextjs";

export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/api/notes')
    const notes: NoteType[] = await res.json()
    return notes.map((note: NoteType) => ({
        id: note.noteId
    }))
}

export default async function EditNotePage({ params }: { params: { id: string }}) {
    const { userId } = auth()

    let note: NoteType | null = null
    if (userId) {
        const res = await fetch(`http://localhost:4000/api/check-note/${userId}/${params.id}`)
        note = await res.json()
    }

    if (!note) {
        return (
            <div className="notes blur-effect blur-bg flex items-center justify-center">
                <div className="flex items-center">
                    <h1 className="text-[30px] pr-[20px] mr-[20px] border-r-[1px] border-gray-500"> 404 </h1>
                    <h1> The note you're looking for cannot be found. </h1>
                </div>
            </div>
        )
    }

    return (
        <Edit id={params.id} />
    )
}
