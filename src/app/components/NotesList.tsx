import { Note } from "@/app/components";

export function NotesList({ category }: { category: String }) {

    // TODO: filter fetch by category

    return (
        <div className="note-list-grid">
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
            <Note />
        </div>
    )
}
