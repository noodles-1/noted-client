import { Navbar, Settings } from "@/app/components";

export default function SettingsPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="wrapper">
                <Navbar />
                <Settings />
            </div>
        </div>
    )
}
