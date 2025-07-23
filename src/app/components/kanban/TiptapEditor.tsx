'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TiptapEditor({
    value,
    onChange,
}: {
    value?: string;
    onChange?: (markdown: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'outline-none prose prose-sm max-w-none',
            },
        },
        immediatelyRender: false,
    });

    return (
        <div className="min-h-[200px] bg-gray-700 rounded-lg p-3 text-gray-100">
            <EditorContent editor={editor} />
        </div>
    );
}
