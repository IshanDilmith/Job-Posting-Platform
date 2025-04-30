'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

const Tiptap = ( content, onChange ) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link,
            Heading.configure({ levels: [1, 2, 3] }),
            Bold,
            Italic,
            Underline,
        ],
        content: content,
        editable: true,
        onUpdate: ({ editor }) => {
        onChange(editor.getHTML())
        },
    })

    if(!editor) {
        return null;
    }

    const addBold = () => {
        editor.chain().focus().toggleBold().run()
    }

    const addItalic = () => {
        editor.chain().focus().toggleItalic().run()
    }

    const addUnderline = () => {
        editor.chain().focus().toggleUnderline().run()
    }

    const setAlignment = (alignment) => {
        editor.chain().focus().setTextAlign(alignment).run()
    }

    const setHeading = (level) => {
        editor.chain().focus().toggleHeading({ level }).run()
    }

    const addLink = () => {
        const url = prompt('Enter the URL')
        if (url) {
        editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="toolbar bg-white border border-gray-200 rounded-t-lg p-2 flex flex-wrap gap-2 shadow-sm">
                <button
                    onClick={addBold}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                        ${editor?.isActive('bold') 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                    Bold
                </button>

                <button
                    onClick={addItalic}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                        ${editor?.isActive('italic')
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                    Italic
                </button>

                <button
                    onClick={addUnderline}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                        ${editor?.isActive('underline')
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                    Underline
                </button>

                <div className="h-6 w-px bg-gray-200 mx-1" /> {/* Divider */}
                    <button
                        onClick={() => setAlignment('left')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive({ textAlign: 'left' })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        Left
                    </button>

                    <button
                        onClick={() => setAlignment('center')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive({ textAlign: 'center' })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        Center
                    </button>

                    <button
                        onClick={() => setAlignment('right')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive({ textAlign: 'right' })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        Right
                    </button>

                    <div className="h-6 w-px bg-gray-200 mx-1" /> {/* Divider */}

                    <button
                        onClick={() => setHeading(1)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive('heading', { level: 1 })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        H1
                    </button>

                    <button
                        onClick={() => setHeading(2)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive('heading', { level: 2 })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        H2
                    </button>
                    <button
                        onClick={() => setHeading(3)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive('heading', { level: 3 })
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        H3
                    </button>
                    <div className="h-6 w-px bg-gray-200 mx-1" /> {/* Divider */}

                    <button
                        onClick={addLink}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                            ${editor?.isActive('link')
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                        Link
                    </button>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                <EditorContent 
                    editor={editor} 
                    className="bg-gray-100 border border-t-0 border-gray-200 rounded-b-lg p-4"
                />
            
                    <style jsx global>{`
                        .ProseMirror {
                        min-height: 200px;
                        height: 100%;
                        padding: 1rem;
                        overflow-y: auto;
                        }

                        .ProseMirror p {
                        margin: 0.5em 0;
                        }

                        .ProseMirror:focus {
                        outline: none;
                        }

                        .ProseMirror > * + * {
                        margin-top: 0.75em;
                        }
                    `}</style>
                </div>
            </div>
    )
}

export default Tiptap

