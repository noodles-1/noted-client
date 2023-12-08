'use client'

import Link from "next/link"
import { Profile } from "@/app/components"
import { useDispatch, useSelector } from "react-redux"
import { mobileHide } from "@/redux/slices/shown"

import './styles.css'
import { useRef } from "react"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"

export function Navbar() {
    const ref = useRef(null)
    useOutsideClick(() => dispatch(mobileHide()), ref)
    
    const { shown } = useSelector((state: any) => state.shown)
    const dispatch = useDispatch()

    return (
        <>
            <div ref={ref} className={`blur-effect blur-dark-bg home ${shown ? 'home-show': ''}`}>
                <Profile />
                <Link href="/home" onClick={() => dispatch(mobileHide())}>
                    <h1> Home </h1>
                </Link>
                <Link href="/home/pinned" onClick={() => dispatch(mobileHide())}>
                    <h1> Pinned </h1>
                </Link>
                <Link href="/home/settings" onClick={() => dispatch(mobileHide())}>
                    <h1> Settings </h1>
                </Link>
            </div>
        </>
    )
}
