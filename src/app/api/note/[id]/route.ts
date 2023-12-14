import { getNote } from "@/app/actions";

export async function GET(
    request: Request,
    { params }: { params: { id: string }}
) {
    const note = await getNote(params.id)
    return Response.json(note)
}