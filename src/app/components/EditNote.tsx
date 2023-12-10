'use client'

import { Menu } from "@/app/components";
import { useCallback, useRef, useState } from "react";
import dynamic from 'next/dynamic'
const CustomQuill = dynamic(() => import('@/app/components/CustomQuill'), { ssr: false })

export function EditNote({ id }: { id: String }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

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

    const handleEnter = (e: any) => {
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
                        onKeyDown={handleEnter}
                    />
                </div>
                <CustomQuill
                    quillRef={handleRef}
                    body={body}
                    setBody={setBody}
                />                
            </div>
            <div className="flex flex-1 flex-col justify-end sm:justify-start items-center sm:items-end text-gray-400 text-[14px]">
                <span> Created on 12/7/23 </span>
                <span> Modified on 12/7/23 </span>
            </div>
        </div>
    )
}
