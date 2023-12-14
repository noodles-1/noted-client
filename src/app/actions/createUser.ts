import { client } from "@/lib/redis"
import { userSchema } from "@/lib/schemas"
import { auth } from "@clerk/nextjs"
import { Repository } from "redis-om"

export async function createUser() {
    const repository = new Repository(userSchema, client)

    const { userId } = auth()

    const userExists = await repository.search().where('userId').equals(userId ?? '').return.first()

    if (!userExists)
        await repository.save({ userId: userId, spellchecked: true, wallpaper: '/background3.png' })
}