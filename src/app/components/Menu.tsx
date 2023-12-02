'use client'

import { mobileShow } from "@/redux/shown"
import { useDispatch } from "react-redux"

export function Menu() {
    const dispatch = useDispatch()

    return (
        <img 
            src="/menu.png"
            alt="menu-bar" 
            className="h-[24px] w-[24px] mb-[20px] block sm:hidden"
            onClick={() => dispatch(mobileShow())}
        />
    )
}
