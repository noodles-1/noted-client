'use client'

import { CustomSwitch } from "@/app/components"
import { useDispatch, useSelector } from "react-redux"
import { toggleSpellcheck } from "@/redux/slices/spellchecked"

export function Spellcheck() {
    const { spellchecked } = useSelector((state: any) => state.spellchecked)
    const dispatch = useDispatch()

    // TODO: attach property in user db instead

    return (
        <div className="w-full flex items-center justify-between border-y-[1px] border-slate-600 py-[14px] sm:py-[10px]">
            <h1> Enable spellcheck </h1>
            <CustomSwitch
                onChange={() => dispatch(toggleSpellcheck())}
                checked={spellchecked}
            />
        </div>
    )
}
