import { Schema } from "redis-om";

export const userSchema = new Schema('user', {
    userId: { type: 'string' },
    spellchecked: { type: 'boolean' },
    wallpaper: { type: 'string' }
}, {
    dataStructure: 'JSON'
})