'use client'

import { CustomSwitch } from "@/app/components"
import { getUser, updateUser } from "@/app/fetch"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Cookies from "universal-cookie"

export function Spellcheck() {
    const cookies = new Cookies()
    const userId = cookies.get('userId')

    const { data, isFetchedAfterMount } = useQuery({
        queryFn: () => getUser(userId),
        queryKey: ['user']
    })

    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
    })

    const handleSpellcheck = async () => {
        await mutateAsync({ userId: data.userId, spellchecked: !data.spellchecked, wallpaper: data.wallpaper })
    }

    return (
        <div className="w-full flex items-center justify-between border-y-[1px] border-slate-600 py-[14px] sm:py-[10px]">
            <h1> Enable spellcheck </h1>
            {isFetchedAfterMount && data && 
                <CustomSwitch
                    checked={data.spellchecked}
                    onChange={async () => await handleSpellcheck()}
                />
            }
        </div>
    )
}
