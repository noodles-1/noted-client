import { Repository, Schema } from "redis-om";
import client from "@/lib/client";

const userSchema = new Schema('user', {
    entityId: { type: 'string' },
    spellchecked: { type: 'boolean' },
    wallpaper: { type: 'string' }
})

export const userRepository = new Repository(userSchema, client)
await userRepository.createIndex()