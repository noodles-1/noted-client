'use client'

import { Menu } from "@/app/components";
import { getUser } from "@/app/fetch";
import { NoteType } from "@/app/interfaces";
import { useCallback, useRef, useState } from "react";
import dynamic from 'next/dynamic'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const CustomQuill = dynamic(() => import('@/app/components/CustomQuill'), { ssr: false })

async function updateNote(updatedNote: any) {
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/update-note', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote)
    })
}

export function EditNote({ note }: { note: NoteType }) {
    const [title, setTitle] = useState(note.title)
    const [body, setBody] = useState(note.body)

    const { data } = useQuery({
        queryFn: () => getUser(note.userId),
        queryKey: ['user']
    })

    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['all-notes'] })
    })

    const createdDate = new Date(note.created)
    const createdFormat = `${createdDate.getMonth()}/${createdDate.getDate()}/${createdDate.getFullYear()}`
    const modifiedDate = new Date(note.modified)
    const modifiedFormat = `${modifiedDate.getMonth()}/${modifiedDate.getDate()}/${modifiedDate.getFullYear()}`

    const quillRef = useRef<HTMLInputElement | null>(null)
    const titleRef = useRef<HTMLInputElement | null>(null)
    
    const handleRef = useCallback((ref: any) => {
        if (ref && data) {
            const quill = ref.getEditor();
            if (quill) {
                quill.root.setAttribute('spellcheck', data.spellchecked);
                quillRef.current = ref;
            }
        }
    }, []);

    const handleTitleKeyDown = (e: any) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault()
            quillRef.current?.focus()
        }
    }

    const handleTitleChange = (e: any) => {
        const updatedNote = {
            noteId: note.noteId,
            title: e.target.value,
            body: body,
            category: note.category,
            modified: new Date()
        }
        
        async function update() {
            await mutateAsync(updatedNote)
        }

        update()
        setTitle(e.target.value)
    }

    const handleBodyChange = (e: string) => {
        const updatedNote = {
            noteId: note.noteId,
            title: title,
            body: e,
            category: note.category,
            modified: new Date()
        }

        async function update() {
            await mutateAsync(updatedNote)
        }

        update()
        setBody(e)
    }

    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <div className="h-[70%] sm:h-[84%] sm:mb-[20px] overflow-y-auto mt-[30px] sm:mt-[20px] w-auto">
                <div className="flex grow">
                    <input 
                        ref={titleRef}
                        type="text" 
                        id="note-title"
                        placeholder="Title" 
                        spellCheck={false} 
                        value={title}
                        onChange={handleTitleChange}
                        autoComplete="off"
                        onKeyDown={handleTitleKeyDown}
                    />
                </div>
                <CustomQuill
                    quillRef={handleRef}
                    body={body}
                    handleBodyChange={handleBodyChange}
                />                
            </div>
            <div className="flex flex-1 flex-col justify-end sm:justify-start items-center sm:items-end text-gray-400 text-[14px]">
                <span> Created on {createdFormat} </span>
                <span> Modified on {modifiedFormat} </span>
            </div>
        </div>
    )
}
