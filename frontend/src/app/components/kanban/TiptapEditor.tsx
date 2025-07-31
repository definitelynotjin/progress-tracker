'use client';

import StarterKit from '@tiptap/starter-kit';
import './tiptap-animations.css';
import { useEditor, EditorContent } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { extractChecklistFromHTML } from "./TaskCard";

export interface ChecklistItem {
    id: string;
    text: string;
    done: boolean;
}

export interface TiptapBulletEditorProps {
    value: string;
    onChange: (content: string) => void;
    onChecklistChange?: (checklist: ChecklistItem[]) => void;
    className?: string;
}

export default function TiptapBulletEditor({ value, onChange, onChecklistChange }: TiptapBulletEditorProps) {
    const [mounted, setMounted] = useState(false);
    const [, setFadeIn] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            // Allow the browser to paint with opacity-0 before animating
            const timeout = setTimeout(() => setFadeIn(true), 10);
            return () => clearTimeout(timeout);
        }
    }, [mounted]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "bullet_class",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "order_class",
                    },
                },
                heading: {
                    HTMLAttributes: {
                        class: "headers_class",
                    },
                },
            }),
        ],
        content: value,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc min-h-[300px] p-4 bg-gray-600 text-sm text-white rounded-md w-full [&_li]:my-0',
            },
        },
        onUpdate({ editor }) {
            const html = editor.getHTML();
            onChange(html);
            if (typeof onChecklistChange === 'function') {
                const checklist = extractChecklistFromHTML(html);
                onChecklistChange(checklist);
            }
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
        <motion.div
            className="w-full max-w-xl mx-auto mt-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <EditorContent editor={editor} />
        </motion.div>
    );
}
