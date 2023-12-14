import { client } from "@/lib/redis";
import { noteSchema } from "@/lib/schemas/noteSchema";
import { Entity, Repository } from "redis-om";

export async function getNote(id: string): Promise<Entity | null> {
    const repository = new Repository(noteSchema, client)
    const note = await repository.search().where('noteId').equals(id).return.first()
    
    return note
}