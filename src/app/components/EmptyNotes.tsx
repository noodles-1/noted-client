import { AddNote, Menu } from '@/app/components'

export function EmptyNotes() {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <div className="h-full w-full flex justify-center items-center text-gray-300">
                <div>
                    <h1 className="flex items-center">
                        Click 
                        <img src="/add.png" alt="add" className="h-[12px] w-[12px] inline-block mx-[6px] opacity-70" /> 
                        to add a note
                    </h1>
                </div>
            </div>
            <AddNote />
        </div>
    )
}
