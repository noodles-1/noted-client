'use client'

import { useMemo, useState } from 'react'
import { Dropdown } from '@/app/components'
import { NoteType } from '@/app/interfaces'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import 'react-quill/dist/quill.snow.css'

export function Note({ 
    note, 
    handlePin, 
    handleUnpin, 
    handleDelete 
}: { 
    note: NoteType,
    handlePin: Function,
    handleUnpin: Function,
    handleDelete: Function
}) {
    const [dropShown, setDropShown] = useState(false)

    // TODO: revalidate tags

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        ],
    }

    const handleDropdown = (e: any) => {
        e.preventDefault()
        setDropShown(true)
    }

    return (
        <div className="note blur-effect blur-dark-bg">
            <div className="mx-[20px] flex-grow">
                <ReactQuill
                    readOnly
                    id="quill"
                    theme="snow"
                    value={note.body} 
                    modules={modules}
                    placeholder="Body"
                    className="note-quill"
                /> 
            </div>
            <Link href={`/home/edit/${note.noteId}`} className={`note-hover ${dropShown ? 'note-drop-show' : ''}`}>
                <img 
                    src="/dropdown.png" 
                    alt="dropdown" 
                    className="h-[30px] my-[12px] mx-[12px] py-[6px] px-[6px] hover:opacity-70 rounded-full hover:bg-gray-700"
                    onClick={handleDropdown}
                />
                {dropShown && 
                    <Dropdown setDropShown={setDropShown}>
                        <div className="main-hover border-b-[1px] border-b-gray-500">
                            {note.category === 'pinned' && (
                                <div className="flex items-center" onClick={async (e) => {
                                    e.preventDefault()
                                    await handleUnpin(note)
                                }}>
                                    <img src="/unpinned.png" alt="unpinned" className="pinned-hover" />
                                    <img src="/pinned.png" alt="unpinned" className="unpinned-hover absolute opacity-100" />
                                    <h1> Pinned </h1>
                                </div>
                            )}
                            {note.category === 'all' && (
                                <div className="flex items-center" onClick={async (e) => {
                                    e.preventDefault()
                                    await handlePin(note)
                                }}>
                                    <img src="/unpinned.png" alt="unpinned" className="unpinned-hover" />
                                    <img src="/pinned.png" alt="unpinned" className="pinned-hover absolute opacity-0" />
                                    <h1> Pin </h1>
                                </div>
                            )}
                            {note.category === 'deleted' && (
                                <div className="flex items-center" onClick={async (e) => {
                                    e.preventDefault()
                                    await handleUnpin(note)
                                }}>
                                    <img src="/restore.png" alt="restore" />
                                    <img src="/restore-fill.png" alt="restore-fill" className="restore-hover absolute opacity-0" />
                                    <h1> Restore </h1>
                                </div>
                            )}
                        </div>
                        <div className="delete-hover border-b-[1px] border-b-gray-600 flex items-center" onClick={async (e) => {
                            e.preventDefault()
                            await handleDelete(note)
                        }}>
                            <img src="/delete.png" alt="delete" />
                            <img src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0" />
                            <h1> Delete </h1>
                        </div>
                    </Dropdown>
                }
            </Link>
        </div>
    )
}
