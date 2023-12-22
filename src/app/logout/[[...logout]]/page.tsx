'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from "universal-cookie"

export default function LogoutPage() {
    const cookies = new Cookies()
    const router = useRouter()
    cookies.remove('userId')

    useEffect(() => {
        router.push('/sign-in')
    }, [router])
}