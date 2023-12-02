import { Home, Notes } from "@/app/components";

export default function Main() {
  return (
    <main className="flex items-center justify-center h-screen">
        <div className="wrapper">
            <Home />
            <Notes />
        </div>
    </main>
  )
}
