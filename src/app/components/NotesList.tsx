import { Note } from "@/app/components";
import { NoteType } from "@/app/interfaces";
import { handlePin, handleUnpin, handleDelete } from "@/app/actions";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

// TODO: use fetch instead to have cache and revalidate
async function getNotes(userId: string, category: string) {
    const res = await fetch(`http://localhost:4000/api/all-notes/${userId}/${category}`, {
        next: {
            revalidate: 1,
            tags: ['all-notes']
        }
    })
    const notes: NoteType[] = await res.json()
    return notes
}

export async function NotesList({ category }: { category: string }) {
    const { userId } = auth()
    
    const notes: NoteType[] = await getNotes(userId ?? '', category)
    revalidateTag('all-notes')

    return (
        <div className="note-list-grid">
            {notes.map((note: NoteType) => (
                <Note 
                    key={note.noteId} 
                    note={note}
                    handlePin={handlePin}
                    handleUnpin={handleUnpin}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    )
}
