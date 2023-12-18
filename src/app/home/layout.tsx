import { Navbar } from "@/app/components";
import { auth } from "@clerk/nextjs";

async function getUser(userId: string) {
    const res = await fetch(`http://localhost:4000/api/get-user/${userId}`)
    const user = await res.json()
    return user
}

export default async function HomeLayout ({ children }: { children: React.ReactNode }) {
    const { userId } = auth()

    const user = await getUser(userId ?? '')

    return (
        <div className="flex items-center justify-center h-screen">
            {user && 
                <img 
                    src={user.wallpaper} 
                    alt="wallpaper" 
                    className="wallpaper" 
                />
            }
            <div className="wrapper">
                <Navbar />
                {children}
            </div>
        </div>
    )
}
