'use client';

import StarterKit from '@tiptap/starter-kit';
import './tiptap-animations.css';
import { useEditor, EditorContent } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { extractChecklistFromHTML } from './TaskCard';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import { Editor } from '@tiptap/core';
import ListKit from '@tiptap/extension-bullet-list';
import { Extension } from '@tiptap/core';

const DashList = Extension.create({
	name: 'dashList',

	addKeyboardShortcuts() {
		return {
			Enter: () => {
				const { state, commands } = this.editor;
				const { selection } = state;
				const { $from } = selection;
				const text = $from.parent.textContent;

				// If current line starts with `- `, add a new line with `- `
				if (text.startsWith('- ')) {
					commands.insertContent('\n- ');
					commands.splitBlock();
					commands.insertContent('- ');
					return true;
				}
				return false;
			},
		};
	},
});

export interface ChecklistItem {
	id: string;
	text: string;
	done: boolean;
}

export interface TiptapBulletEditorProps {
	taskId: string | number;
	value: string;
	onChange: (content: string) => void;
	onChecklistChange?: (
		taskId: string | number,
		checklist: ChecklistItem[],
	) => void;
	className?: string;
}

export default function TiptapBulletEditor({
	taskId,
	value,
	onChange,
	onChecklistChange,
}: TiptapBulletEditorProps) {
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
	// console.log('document exists?', typeof document !== 'undefined');

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: false,
				listItem: false,
			}),
			BulletList,
			ListItem,
			DashList,
		],
		content: value,

		onUpdate({ editor }) {
			const html = editor.getHTML();
			onChange(html);

			if (typeof onChecklistChange === 'function') {
				const checklist = extractChecklistFromHTML(html);
				onChecklistChange(taskId, checklist);
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
