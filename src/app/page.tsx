'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Cookies from 'universal-cookie'

async function createUser(userId: string) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/create-user', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId })
    })
}

export default async function Page() {
    const { user } = useUser()
    const router = useRouter()
    const cookies = new Cookies()

    if (user) {
        await createUser(user.id)
        cookies.set('userId', user.id)
        router.push('/home')
    }
}