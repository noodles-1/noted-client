import { Suspense } from "react"
import { AddNote, EmptyTrash, Menu, NotesList } from "@/app/components"

export function Notes({ category }: { category: String }) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="blur-effect notes blur-bg">
            <div className="overflow-y-auto">
                <Menu />
                <div className="flex justify-between items-center h-[50px] mb-[20px] sm:mb-[10px]">
                    <h1 className="text-[24px]"> {categoryName} notes </h1>
                    {category === 'deleted' && 
                        <EmptyTrash />
                    }
                </div>
                <Suspense fallback={<h1 className="text-center"> Loading... </h1>}>
                    <NotesList category={category} />
                </Suspense>
            </div>
            {category !== 'deleted' && <AddNote />}
        </div>
    )
}
