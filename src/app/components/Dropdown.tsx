'use client'

import { useRef } from "react"
import { useOutsideClick } from "@/app/hooks/useOutsideClick"

export function Dropdown({ setDropShown }: { setDropShown: Function }) {
    const ref = useRef(null)

    useOutsideClick(() => setDropShown(false), ref)

    return (
        <div ref={ref} className="dropdown blur-effect">
            Dropdown
        </div>
    )
}
