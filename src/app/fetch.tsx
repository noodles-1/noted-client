export async function getUser(userId: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/get-user/${userId}`)
    const user = await res.json()
    return user
}

export async function updateUser(user: any) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/update-user`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
}