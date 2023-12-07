'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import 'react-quill/dist/quill.snow.css'

export function Note() {

    // TODO: receive body and note id as parameter
    // TODO: link redirects to /home/edit/<note id>

    const body = '<p>hello <strong>world</strong></p><ul><li>the</li><li>quick</li><li>brown</li></ul><ol><li>fox</li><li>jumps</li><li class="ql-indent-1">over</li><li class="ql-indent-1">the</li></ol><ul data-checked="false"><li>lazy</li><li><em>dog</em></li><li>the end</li></ul>'

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        ],
    }

    return (
        <div className="note blur-effect blur-dark-bg">
            <div className="mx-[20px] flex-grow">
                <ReactQuill
                    id="quill"
                    theme="snow"
                    value={body} 
                    modules={modules}
                    placeholder="Body"
                    className="note-quill"
                /> 
            </div>
            <Link href="/home/edit/69" className="note-hover">
                
            </Link>
        </div>
    )
}
