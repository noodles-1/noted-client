import { Suspense } from "react"
import { AddNote, Menu, NotesList } from "@/app/components"
import Loading from "@/app/loading"

export function Notes({ category }: { category: String }) {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="blur-effect notes blur-bg">
            <div className="overflow-y-auto">
                <Menu />
                <h1 className="text-[24px] mb-[30px] sm:mb-[14px]"> {categoryName} notes </h1>
                <Suspense fallback={<Loading />}>
                    <NotesList category={category} />
                </Suspense>
            </div>
            <AddNote />
        </div>
    )
}
