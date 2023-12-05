'use client'

import { useDispatch, useSelector } from "react-redux"
import { Profile } from "@/app/components"
import { mobileHide } from "@/redux/slices/shown"
import Link from "next/link"
import './styles.css'

export function Navbar() {
    const { shown } = useSelector((state: any) => state.shown)
    const dispatch = useDispatch()

    return (
        <>
            {shown && 
                <div 
                    className="absolute left-0 top-0 h-full w-full z-[5] block sm:hidden"
                    onClick={() => dispatch(mobileHide())}
                > </div>
            }
            <div className={`blur-effect blur-dark-bg home ${shown ? 'home-show': ''}`}>
                <Profile />
                <Link href="/home" onClick={() => dispatch(mobileHide())}>
                    <h1> Home </h1>
                </Link>
                <Link href="/home/pinned" onClick={() => dispatch(mobileHide())}>
                    <h1> Pinned </h1>
                </Link>
                <Link href="/settings" onClick={() => dispatch(mobileHide())}>
                    <h1> Settings </h1>
                </Link>
            </div>
        </>
    )
}
