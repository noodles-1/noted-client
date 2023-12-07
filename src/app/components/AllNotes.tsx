import { Suspense } from 'react'
import { AddNote, AllNotesList, Menu } from '@/app/components'
import Loading from '@/app/loading'
import './styles.css'

export function AllNotes() {
    return (
        <div className="blur-effect notes blur-bg">
            <div className="overflow-y-auto">
                <Menu />
                <h1 className="text-[24px] mb-[30px] sm:mb-[14px]"> All notes </h1>
                <Suspense fallback={<Loading />}>
                    <AllNotesList />
                </Suspense>
            </div>
            <AddNote />
        </div>
    )
}
