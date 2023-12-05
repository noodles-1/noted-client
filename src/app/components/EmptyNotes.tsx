import { AddNote, Menu } from '@/app/components'

export function EmptyNotes() {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <h1> Empty notes page </h1>
            <AddNote />
        </div>
    )
}
