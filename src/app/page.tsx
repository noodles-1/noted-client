import { EmptyNotes, Navbar } from "@/app/components";
import { auth } from "@clerk/nextjs";
import { createUser } from "@/app/actions/createUser";

export default async function Page() {
    const { userId } = auth()
    
    await createUser(userId ?? '')

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                <EmptyNotes />
            </div>
        </div>
    )
}
