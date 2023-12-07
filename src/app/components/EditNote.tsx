'use client'

import { Menu } from "@/app/components";
import { useMemo, useState } from "react";
import dynamic from 'next/dynamic'

import 'react-quill/dist/quill.snow.css'

export function EditNote({ id }: { id: String }) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        ],
    }
    
    return (
        <div className="blur-effect notes blur-bg">
            <Menu />
            <div className="h-[70%] sm:h-[86%] overflow-y-auto mt-[30px] sm:mt-[20px] w-auto">
                <div className="flex grow">
                    <input 
                        type="text" 
                        id="note-title"
                        placeholder="Title" 
                        spellCheck={false} 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <ReactQuill
                    id="quill"
                    theme="snow"
                    value={body} 
                    onChange={setBody}
                    modules={modules}
                    placeholder="Body"
                    className="edit-note-quill"
                />                
            </div>
            <div className="flex flex-1 flex-col justify-end sm:justify-start items-center sm:items-end text-gray-400 text-[14px]">
                <span> Created on 12/7/23 </span>
                <span> Modified on 12/7/23 </span>
            </div>
        </div>
    )
}
