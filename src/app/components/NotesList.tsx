import { Note } from "@/app/components";

export function NotesList({ category }: { category: String }) {

    // TODO: filter fetch by category

    return (
        <div className="note-list-grid">
            <Note category="all" />
            <Note category="pinned" />
            <Note category="pinned" />
            <Note category="all" />
            <Note category="all" />
            <Note category="all" />
            <Note category="pinned" />
            <Note category="deleted" />
        </div>
    )
}
