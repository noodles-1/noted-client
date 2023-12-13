import { userRepository } from "@/repositories";

export async function createUser(userId: string) {
    const userExists = await userRepository.search().where('entityId').equals(userId).return.all()
    if (userExists.length == 0)
        await userRepository.save({ entityId: userId, spellchecked: false, wallpaper: '/background3.jpg' })
}