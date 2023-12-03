import { Navbar, EmptyNotes } from "@/app/components";

export default function Main() {
  return (
    <main className="flex items-center justify-center h-screen">
        <div className="wrapper">
            <Navbar />
            <EmptyNotes />
        </div>
    </main>
  )
}
