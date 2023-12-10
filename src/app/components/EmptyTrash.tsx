'use client'

export function EmptyTrash() {
    return (
        <div className="flex delete-hover items-center cursor-pointer" onClick={() => console.log('empty trash')}>
            <img src="/delete.png" alt="delete" className="h-[20px]" />
            <img src="/delete-fill.png" alt="delete-fill" className="h-[20px] deleted-hover absolute opacity-0" />
            <h1 className="px-[6px]"> Empty trash </h1>
        </div>
    )
}
