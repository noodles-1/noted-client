'use client'

import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

export default function CustomQuill({ quillRef, body, setBody }: { quillRef: any, body: any, setBody: any }) {
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
            onChange={setBody}
            theme="snow"
            modules={modules}
            placeholder="Body"
            className="edit-note-quill"
        />
    )
}
