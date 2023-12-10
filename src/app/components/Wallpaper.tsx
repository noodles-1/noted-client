'use client'

import { useState } from "react"
import { Dropdown } from "@/app/components"

export function Wallpaper() {
    // TODO: attach property in user db instead

    const [dropShown, setDropShown] = useState(false)

    const wallpapers = []
    for (let i = 1; i <= 5; i++) {
        wallpapers.push(
            <img 
                src={`/background${i}.jpg`} 
                alt={`background${i}`} 
                key={`background${i}`}
            />
        )
    }

    return (
        <div className="w-full items-center justify-between border-b-[1px] border-slate-600 py-[14px] sm:py-[10px] hidden sm:flex relative"> 
            Change background wallpaper
            <h1 className="text-blue-400 cursor-pointer hover:underline" onClick={() => setDropShown(true)}> Choose image </h1>
            {dropShown &&
                <Dropdown setDropShown={setDropShown}>
                    <div className="wallpaper-grid">
                        {wallpapers.map(wallpaper => wallpaper)}
                        <div className="h-full w-full bg-slate-500 rounded-[6px] border-slate-200 border-dashed border-[2px] text-gray-200 flex items-center justify-center text-[14px] cursor-pointer hover:bg-slate-600">
                            CHOOSE IMAGE
                        </div>
                    </div>
                </Dropdown>
            }
        </div>
    )
}
