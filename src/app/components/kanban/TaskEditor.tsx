'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type TaskEditorProps = {
    content: string;
    onChange: (content: string) => void;
};

export default function TaskEditor({ content, onChange }: TaskEditorProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false, // <-- add this line
    });

    if (!mounted) return null;

    return <EditorContent editor={editor} />;
}
