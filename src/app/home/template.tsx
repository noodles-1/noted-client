import { Navbar } from "@/app/components"

export default function HomeTemplate({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                {children}
            </div>
        </div>
    )
}
