import { EmptyNotes, Navbar } from "@/app/components";
import { createUser } from "@/app/actions";

export default function Page() {
    createUser()

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                <EmptyNotes />
            </div>
        </div>
    )
}
