import { AddNote, EmptyTrash, Menu } from "@/app/components"
import { NotesList } from "./NotesList"

export function Notes({ category }: { category: string }) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="blur-effect notes blur-bg">
            <div className="overflow-y-auto h-full">
                <Menu />
                <div className="flex justify-between items-center h-[50px] mb-[20px] sm:mb-[10px]">
                    <h1 className="text-[24px]"> {categoryName} notes </h1>
                    {category === 'deleted' && <EmptyTrash />}
                </div>
                <NotesList category={category} />
            </div>
            {category !== 'deleted' && <AddNote />}
        </div>
    )
}
