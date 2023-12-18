'use client'

import { useState } from "react"
import { Dropdown } from "@/app/components"
import { getUser, updateUser } from "@/app/fetch"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"

// AWS S3
import { S3 } from "aws-sdk"
import { s3 } from "@/config/aws_s3"

export function Wallpaper() {
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    const [dropShown, setDropShown] = useState(false)
    const router = useRouter()

    const { data } = useQuery({
        queryFn: () => getUser(userId),
        queryKey: ['user']
    })

    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
    })

    const handleWallpaper = async (wallpaper: string) => {
        await mutateAsync({ userId: data.userId, spellchecked: data.spellchecked, wallpaper: wallpaper })
        router.refresh()
    }

    const handleImgInput = (e: any) => {
        if (e.target.files.length == 0) return
        const img = e.target.files[0]

        const params: S3.PutObjectRequest = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
            Key: img.name,
            Body: img
        }

        s3.upload(params, async (err: any, data) => {
            if (err)
                console.error('Error uploading image: ' + err)
            else
                await handleWallpaper(data.Location)
        })

        e.target.files.length == 0
    }

    const wallpapers = []
    for (let i = 1; i <= 5; i++) {
        const url = `background${i}`
        wallpapers.push(
            <img 
                src={`/${url}.jpg`} 
                alt={url} 
                key={url}
                onClick={() => handleWallpaper(`/${url}.jpg`)}
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
                        <label htmlFor="imageUpload" className="h-full w-full bg-slate-500 rounded-[6px] border-slate-200 border-dashed border-[2px] text-gray-200 flex items-center justify-center text-[14px] cursor-pointer hover:bg-slate-600">
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImgInput} />
                            CHOOSE IMAGE
                        </label>
                    </div>
                </Dropdown>
            }
        </div>
    )
}
