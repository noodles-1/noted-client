import { auth } from "@clerk/nextjs";
import { client } from "@/lib/redis";
import { noteSchema } from "@/lib/schemas";
import { Entity, Repository } from "redis-om";
import uniqid from 'uniqid'

export async function createNote(): Promise<Entity | null> {
    const repository = new Repository(noteSchema, client)

    const { userId } = auth()

    const note = {
        noteId: uniqid('note_'),
        userId: userId,
        title: '',
        body: '',
        category: 'all',
        created: new Date(),
        modified: new Date()
    }

    const newNote = await repository.save(note)
    return newNote
}