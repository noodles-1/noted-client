import { Edit } from "@/app/components";

// TODO: create static params

export default function EditNotePage({ params }: { params: { id: string }}) {
    return (
        <Edit id={params.id} />
    )
}
