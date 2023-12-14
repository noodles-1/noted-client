import { Schema } from "redis-om";

export const noteSchema = new Schema('note', {
    noteId: { type: 'string' },
    userId: { type: 'string' },
    title: { type: 'string' },
    body: { type: 'string' },
    category: { type: 'string' }, // all, pinned or deleted
    created: { type: 'date' },
    modified: { type: 'date' }
})