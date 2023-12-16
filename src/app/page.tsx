import { EmptyNotes, Navbar } from "@/app/components";
import { auth } from "@clerk/nextjs";

export default function Page() {
    const { userId } = auth()

    fetch('http://localhost:4000/api/create-user', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId ?? '' })
    })

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                <EmptyNotes />
            </div>
        </div>
    )
}
