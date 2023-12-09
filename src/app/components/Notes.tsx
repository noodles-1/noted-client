import { Suspense } from "react"
import { AddNote, Menu, NotesList } from "@/app/components"
import Loading from "@/app/loading"

export function Notes({ category }: { category: String }) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="blur-effect notes blur-bg">
            <div className="overflow-y-auto">
                <Menu />
                <div className="flex justify-between items-center h-[50px] mb-[20px] sm:mb-[10px]">
                    <h1 className="text-[24px]"> {categoryName} notes </h1>
                    {category === 'deleted' && 
                        <div className="flex delete-hover items-center cursor-pointer">
                            <img src="/delete.png" alt="delete" className="h-[20px]" />
                            <img src="/delete-fill.png" alt="delete-fill" className="h-[20px] deleted-hover absolute opacity-0" />
                            <h1 className="px-[6px]"> Empty trash </h1>
                        </div>
                    }
                </div>
                <Suspense fallback={<Loading />}>
                    <NotesList category={category} />
                </Suspense>
            </div>
            <AddNote />
        </div>
    )
}
