'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Dropdown } from '@/app/components'

import 'react-quill/dist/quill.snow.css'

export function Note() {
    const [dropShown, setDropShown] = useState(false)

    // TODO: receive body and note id as parameter
    // TODO: link redirects to /home/edit/<note id>

    const body = '<p>hello <strong>world</strong></p><ul><li>the</li><li>quick</li><li>brown</li></ul><ol><li>fox</li><li>jumps</li><li class="ql-indent-1">over</li><li class="ql-indent-1">the</li></ol><ul data-checked="false"><li>lazy</li><li><em>dog</em></li><li>the end</li></ul>'
    const pinned = true

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
                    id="quill"
                    theme="snow"
                    value={body} 
                    modules={modules}
                    placeholder="Body"
                    className="note-quill"
                /> 
            </div>
            <Link href="/home/edit/69" className={`note-hover ${dropShown ? 'note-drop-show' : ''}`}>
                <img 
                    src="/dropdown.png" 
                    alt="dropdown" 
                    className="h-[30px] my-[12px] mx-[12px] py-[6px] px-[6px] hover:opacity-70 rounded-full hover:bg-gray-700"
                    onClick={handleDropdown}
                />
                {dropShown && 
                    <Dropdown setDropShown={setDropShown}>
                        <div className="pin-hover border-b-[1px] border-b-gray-500">
                            {pinned ? (
                                <>
                                    <img src="/unpinned.png" alt="unpinned" className="pinned-hover" />
                                    <img src="/pinned.png" alt="unpinned" className="unpinned-hover absolute opacity-100" />
                                    <h1> Pinned </h1>
                                </>
                            ) : (
                                <>
                                    <img src="/unpinned.png" alt="unpinned" className="unpinned-hover" />
                                    <img src="/pinned.png" alt="unpinned" className="pinned-hover absolute opacity-0" />
                                    <h1> Pin </h1>
                                </>
                            )}
                        </div>
                        <div className="delete-hover border-b-[1px] border-b-gray-600">
                            <img src="/delete.png" alt="delete" />
                            <img src="/delete-fill.png" alt="delete-fill" className="delete-hover absolute opacity-0" />
                            <h1> Delete </h1>
                        </div>
                    </Dropdown>
                }
            </Link>
        </div>
    )
}
