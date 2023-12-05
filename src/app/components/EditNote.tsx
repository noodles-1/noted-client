import { Menu } from "@/app/components";

export function EditNote({ id }: { id: String }) {
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <h1> Edit note ID: {id} </h1>
        </div>
    )
}
