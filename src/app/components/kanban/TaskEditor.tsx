'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type TaskEditorProps = {
    content: string;
    assignee?: string;
    onChange: (content: string) => void;
    onAssigneeChange?: (assignee: string) => void;
};

export default function TaskEditor({ content, assignee = "", onChange, onAssigneeChange }: TaskEditorProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    if (!mounted) return null;

    return (
        <div className="flex flex-col gap-4">
            <EditorContent editor={editor} className="text-gray-200" />
            <input
                type="text"
                className="bg-gray-700 text-gray-200 rounded px-3 py-2 mt-2"
                placeholder="Assigned to..."
                value={assignee}
                onChange={e => onAssigneeChange && onAssigneeChange(e.target.value)}
            />
        </div>
    );
}
