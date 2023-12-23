'use client'

import { mobileShow } from "@/redux/slices/shown"
import Image from "next/image"
import { useDispatch } from "react-redux"

export function Menu() {
    const dispatch = useDispatch()

    return (
        <Image 
            height={24}
            width={24}
            src="/menu.png"
            alt="menu-bar" 
            className="h-[24px] w-[24px] mb-[20px] block sm:hidden"
            onClick={() => dispatch(mobileShow())}
        />
    )
}
