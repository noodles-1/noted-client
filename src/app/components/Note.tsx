'use client'

import { useMemo, useState } from 'react'
import { Dropdown } from '@/app/components'
import { NoteType } from '@/app/interfaces'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import 'react-quill/dist/quill.snow.css'
import Image from 'next/image'

async function pinNote(note: any) {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'pinned',
        modified: note.modified
    }

    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote)
    })
}

async function unpinNote(note: any) {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'all',
        modified: note.modified
    }

    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote)
    })
}

async function deleteNote(note: any) {
    const updatedNote = {
        noteId: note.noteId,
        title: note.title,
        body: note.body,
        category: 'deleted',
        modified: note.modified
    }

    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote)
    })
}

async function deleteNoteForever(noteId: string) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/delete-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId: noteId })
    })
}

export function Note({ note }: { note: NoteType }) {
    const [dropShown, setDropShown] = useState(false)

    const queryClient = useQueryClient()

    const { mutateAsync: mutatePinNote, isPending: pinPending } = useMutation({
        mutationFn: pinNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

    const { mutateAsync: mutateUnpinNote, isPending: unpinPending } = useMutation({
        mutationFn: unpinNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

    const { mutateAsync: mutateDeleteNote, isPending: deletePending } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

    const { mutateAsync: mutateDeleteNoteForever, isPending: deleteForeverPending } = useMutation({
        mutationFn: deleteNoteForever,
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
    
    const handleUnpin = async () => {
        await mutateUnpinNote(note)
    }
    
    const handlePin = async () => {
        await mutatePinNote(note)
    }
    
    const handleDelete = async () => {
        await mutateDeleteNote(note)
    }

    const handleDeleteForever = async () => {
        await mutateDeleteNoteForever(note.noteId)
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
                    <Image
                        height={30}
                        width={30} 
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
                                        <Image height={24} width={30} src="/unpinned.png" alt="unpinned" className="pinned-hover" />
                                        <Image height={24} width={30} src="/pinned.png" alt="unpinned" className="unpinned-hover absolute opacity-100" />
                                        <h1> {unpinPending ? 'Unpinning' : 'Pinned'} </h1>
                                    </div>
                                )}
                                {note.category === 'all' && (
                                    <div className="flex items-center" onClick={async (e) => {
                                        e.preventDefault()
                                        await handlePin()
                                    }}>
                                        <Image height={24} width={30} src="/unpinned.png" alt="unpinned" className="unpinned-hover" />
                                        <Image height={24} width={30} src="/pinned.png" alt="unpinned" className="pinned-hover absolute opacity-0" />
                                        <h1> {pinPending ? 'Pinning' : 'Pin'} </h1>
                                    </div>
                                )}
                            </div>
                            <div className="delete-hover border-b-[1px] border-b-gray-600 flex items-center" onClick={async (e) => {
                                e.preventDefault()
                                await handleDelete()
                            }}>
                                <Image height={24} width={30} src="/delete.png" alt="delete" />
                                <Image height={24} width={30} src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0" />
                                <h1> {deletePending ? 'Deleting' : 'Delete'} </h1>
                            </div>
                        </Dropdown>
                    }
                </Link>
            :
                <div className={`note-hover ${dropShown ? 'note-drop-show' : ''}`}>
                    <Image
                        height={30}
                        width={30}  
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
                                    <Image height={24} width={30} src="/restore.png" alt="restore" />
                                    <Image height={24} width={30} src="/restore-fill.png" alt="restore-fill" className="restore-hover absolute opacity-0" />
                                    <h1> {unpinPending ? 'Restoring' : 'Restore'} </h1>
                                </div>
                            </div>
                            <div className="delete-hover border-b-[1px] border-b-gray-600 flex items-center cursor-pointer" onClick={async (e) => {
                                e.preventDefault()
                                await handleDeleteForever()
                            }}>
                                <Image height={24} width={30} src="/delete.png" alt="delete" />
                                <Image height={24} width={30} src="/delete-fill.png" alt="delete-fill" className="deleted-hover absolute opacity-0" />
                                <h1> {deleteForeverPending ? 'Deleting' : 'Delete'} </h1>
                            </div>
                        </Dropdown>
                    }
                </div>
            }
        </div>
    )
}
