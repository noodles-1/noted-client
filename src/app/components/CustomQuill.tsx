'use client'

import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

export default function CustomQuill({ 
    quillRef, 
    body,
    handleBodyChange
}: { 
    quillRef: any, 
    body: any, 
    handleBodyChange: any
}) {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
        ],
    }

    return (
        <ReactQuill
            ref={quillRef}
            id="quill"
            value={body}
            onChange={handleBodyChange}
            theme="snow"
            modules={modules}
            placeholder="Body"
            className="edit-note-quill"
        />
    )
}
