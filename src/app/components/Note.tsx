'use client'

import { useMemo, useState } from 'react'
import { Dropdown } from '@/app/components'
import { NoteType } from '@/app/interfaces'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import 'react-quill/dist/quill.snow.css'

async function updateNote(updatedNote: any) {
    await fetch('http://localhost:4000/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
        cache: 'no-store'
    })
}

export function Note({ note }: { note: NoteType }) {
    const [dropShown, setDropShown] = useState(false)

    const queryClient = useQueryClient()
    const { mutateAsync } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

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

    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: '',
        modified: note.modified
    }
    
    const handleUnpin = async () => {
        updatedNote.category = 'all'
        await mutateAsync(updatedNote)
    }
    
    const handlePin = async () => {
        updatedNote.category = 'pinned'
        await mutateAsync(updatedNote)
    }
    
    
    const handleDelete = async () => {
        updatedNote.category = 'deleted'
        await mutateAsync(updatedNote)
    }

    return (
        <div className="note blur-effect blur-dark-bg py-[20px]">
            <div className="mx-[20px] flex-grow">
                <div className="overflow-x-hidden whitespace-nowrap text-ellipsis"> {note.title} </div> 
                <ReactQuill
                    readOnly
                    id="quill"
                    theme="snow"
                    value={note.body} 
                    modules={modules}
                    className="note-quill"
                /> 
            </div>
            {note.category !== 'deleted' ?
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
                                        await handleUnpin()
                                    }}>
                                        <img src="/unpinned.png" alt="unpinned" className="pinned-hover" />
                                        <img src="/pinned.png" alt="unpinned" className="unpinned-hover absolute opacity-100" />
                                        <h1> Pinned </h1>
                                    </div>
                                )}
                                {note.category === 'all' && (
                                    <div className="flex items-center" onClick={async (e) => {
                                        e.preventDefault()
                                        await handlePin()
                                    }}>
                                        <img src="/unpinned.png" alt="unpinned" className="unpinned-hover" />
                                        <img src="/pinned.png" alt="unpinned" className="pinned-hover absolute opacity-0" />
                                        <h1> Pin </h1>
                                    </div>
                                )}
                            </div>
                            <div className="delete-hover border-b-[1px] border-b-gray-600 flex items-center" onClick={async (e) => {
                                e.preventDefault()
                                await handleDelete()
                            }}>
                                <img src="/delete.png" alt="delete" />
                                <img src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0" />
                                <h1> Delete </h1>
                            </div>
                        </Dropdown>
                    }
                </Link>
            :
                <div className={`note-hover ${dropShown ? 'note-drop-show' : ''}`}>
                    <img 
                        src="/dropdown.png" 
                        alt="dropdown" 
                        className="h-[30px] my-[12px] mx-[12px] py-[6px] px-[6px] hover:opacity-70 rounded-full hover:bg-gray-700 cursor-pointer"
                        onClick={handleDropdown}
                    />
                    {dropShown && 
                        <Dropdown setDropShown={setDropShown}>
                            <div className="main-hover border-b-[1px] border-b-gray-500 cursor-pointer">
                                <div className="flex items-center" onClick={async (e) => {
                                    e.preventDefault()
                                    await handleUnpin()
                                }}>
                                    <img src="/restore.png" alt="restore" />
                                    <img src="/restore-fill.png" alt="restore-fill" className="restore-hover absolute opacity-0" />
                                    <h1> Restore </h1>
                                </div>
                            </div>
                            <div className="delete-hover border-b-[1px] border-b-gray-600 flex items-center cursor-pointer" onClick={async (e) => {
                                e.preventDefault()
                                console.log('permanently delete this note')
                            }}>
                                <img src="/delete.png" alt="delete" />
                                <img src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0" />
                                <h1> Delete </h1>
                            </div>
                        </Dropdown>
                    }
                </div>
            }
        </div>
    )
}
