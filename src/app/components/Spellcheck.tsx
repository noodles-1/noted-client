'use client'

import { CustomSwitch } from "@/app/components"

export function Spellcheck() {
    // TODO: attach property in user db instead

    return (
        <div className="w-full flex items-center justify-between border-y-[1px] border-slate-600 py-[14px] sm:py-[10px]">
            <h1> Enable spellcheck </h1>
            <CustomSwitch
            />
        </div>
    )
}
