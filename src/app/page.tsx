import { EmptyNotes, Navbar } from "@/app/components";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                <EmptyNotes />
            </div>
        </div>
    )
}
