'use client'

import { Profile } from "@/app/components"
import { useDispatch, useSelector } from "react-redux"
import './styles.css'
import { mobileHide } from "@/redux/shown"

export function Home() {
    const { shown } = useSelector((state: any) => state.shown)
    const dispatch = useDispatch()

    return (
        <div className={`blur-effect blur-dark-bg home ${shown ? 'home-show': ''}`}>
            <button onClick={() => dispatch(mobileHide())}> hide me </button>
            <Profile />
        </div>
    )
}
