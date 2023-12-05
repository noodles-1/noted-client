import Link from 'next/link'

export function AddNote () {
    return (
        <Link href="/home/edit/69">
            <div className="blur-effect add-note-btn">
                <h1 className="mr-[16px] pr-[16px] border-r-[1px] border-r-gray-700 hidden sm:block"> Add note </h1>
                <img src="/add.png" alt="add-note" />
            </div>
        </Link>
    )
}
