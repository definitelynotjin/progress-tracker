'use client';

import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import { useEditor, EditorContent } from '@tiptap/react';
import React, { useEffect, useState } from 'react';



export interface TiptapBulletEditorProps {
    value: string;
    onChange: (content: string) => void;
    className?: string;
}

export default function TiptapBulletEditor({ value, onChange, className }: TiptapBulletEditorProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ bulletList: false }),
            BulletList,
            ListItem,
        ],
        content: value,
        autofocus: true,
        editorProps: {
            attributes: {
                class: className || 'min-h-[300px] p-4 bg-gray-600 text-sm text-white rounded-md w-full',
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onChange(html);
        },
        immediatelyRender: false,
    });

    // Sync external value changes to editor
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-xl mx-auto mt-6">
            <EditorContent editor={editor} />
        </div>
    );
}
