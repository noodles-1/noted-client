'use client'

import { Navbar } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Cookies from "universal-cookie"

async function getUser(userId: string) {
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/get-user/${userId}`)
    const user = await res.json()
    return user
}

export default function HomeLayout ({ children }: { children: React.ReactNode }) {
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    
    const { data: user } = useQuery({
        queryFn: () => getUser(userId),
        queryKey: ['user']
    })

    return (
        <div className="flex items-center justify-center h-screen">
            {user && 
                <Image
                    layout="fill"
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
