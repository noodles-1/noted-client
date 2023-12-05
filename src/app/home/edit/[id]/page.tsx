import { EditNote } from "@/app/components";

// TODO: create static params

export default function EditNotePage({ params }: { params: { id: String }}) {
    return (
        <EditNote id={params.id} />
    )
}
