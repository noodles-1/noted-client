export async function getUser(userId: string) {
    const res = await fetch(`http://localhost:4000/api/get-user/${userId}`)
    const user = await res.json()
    return user
}

export async function updateUser(user: any) {
    await fetch(`http://localhost:4000/api/update-user`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
}