import { Note } from "@/app/interfaces";
import { updateNote } from "@/app/actions";

export async function POST(request: Request) {
    const req: Note = await request.json()
    await updateNote(req)
    return Response.json('ok')
}