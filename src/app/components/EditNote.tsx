'use client'

import { Menu } from "@/app/components";
import { Note } from "@/app/interfaces";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic'
const CustomQuill = dynamic(() => import('@/app/components/CustomQuill'), { ssr: false })

export function EditNote({ id, note }: { id: string, note: Note }) {
    const [title, setTitle] = useState(note.title)
    const [body, setBody] = useState(note.body)

    const { user } = useUser()

    const createdDate = new Date(note.created)
    const createdFormat = `${createdDate.getMonth()}/${createdDate.getDate()}/${createdDate.getFullYear()}`
    const modifiedDate = new Date(note.modified)
    const modifiedFormat = `${modifiedDate.getMonth()}/${modifiedDate.getDate()}/${modifiedDate.getFullYear()}`

    useEffect(() => {
        const updatedNote: Note = {
            userId: user?.id ?? '',
            noteId: id,
            title: title,
            body: body,
            category: note.category,
            created: note.created,
            modified: note.modified
        }

        async function updateNote() {
            await fetch('/api/update-note', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedNote)
            })
        }

        updateNote()
    }, [title, body])

    const quillRef = useRef<HTMLInputElement | null>(null)
    const titleRef = useRef<HTMLInputElement | null>(null)
    
    const handleRef = useCallback((ref: any) => {
        if (ref) {
            const quill = ref.getEditor();
            if (quill) {
                quill.root.setAttribute('spellcheck', false);
                quillRef.current = ref;
            }
        }
    }, []);

    const handleKeyDown = async (e: any) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault()
            quillRef.current?.focus()
        }
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
                        onChange={e => setTitle(e.target.value)}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <CustomQuill
                    quillRef={handleRef}
                    body={body}
                    setBody={setBody}
                />                
            </div>
            <div className="flex flex-1 flex-col justify-end sm:justify-start items-center sm:items-end text-gray-400 text-[14px]">
                <span> Created on {createdFormat} </span>
                <span> Modified on {modifiedFormat} </span>
            </div>
        </div>
    )
}
