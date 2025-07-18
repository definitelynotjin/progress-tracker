'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type TaskEditorProps = {
    content: string;
    onChange: (content: string) => void;
};

export default function TaskEditor({ content, onChange }: TaskEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="border rounded-md p-4 min-h-[200px] bg-white shadow-sm">
            <EditorContent editor={editor} />
        </div>
    );
}
