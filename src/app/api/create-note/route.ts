import { createNote } from "@/app/actions"

export async function POST(request: Request) {
    const note = await createNote()
    return Response.json({ noteId: note?.noteId })
}