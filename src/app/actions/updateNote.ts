import { Note } from "@/app/interfaces";
import { client } from "@/lib/redis";
import { noteSchema } from "@/lib/schemas/noteSchema";
import { Repository } from "redis-om";

export async function updateNote(note: Note) {
    const repository = new Repository(noteSchema, client)
    const result = await repository.search().where('noteId').equals(note.noteId).first()
    if (result) {
        result.title = note.title
        result.body = note.body
        result.category = note.category
        result.modified = note.modified
        await repository.save(result)
    }
}