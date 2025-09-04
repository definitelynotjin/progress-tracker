import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './MDEditor.css';
import { orderedListInputRegex } from '@tiptap/extension-list';
import gfm from 'remark-gfm';

export interface ChecklistItem {
	id: string;
	text: string;
	done: boolean;
}

export interface MarkdownEditorProps {
	taskId: string | number;
	value: string;
	onChange: (content: string) => void;
	onChecklistChange?: (
		taskId: string | number,
		checklist: ChecklistItem[],
	) => void;
	className?: string;
}

export default function MarkdownEditor({
	taskId,
	value,
	onChange,
	onChecklistChange,
}: MarkdownEditorProps) {
	function extractChecklistFromMarkdown(markdown: string): ChecklistItem[] {
		console.log('markdown?', markdown);
		const checklistRegex = /- \[([ x])\] (.+)/g;
		const items: ChecklistItem[] = [];
		let match;

		while ((match = checklistRegex.exec(markdown)) !== null) {
			const [, checked, text] = match;
			items.push({
				id: `checklist-${items.length + 1}`,
				text: text.trim(),
				done: checked === 'x',
			});
		}
		if (items.length === 0) {
			while ((match = orderedListInputRegex.exec(markdown)) !== null) {
				const [, text] = match;
				items.push({
					id: `checklist-${items.length + 1}`,
					text: text.trim(),
					done: false,
				});
			}
		}
		console.log('items?: ', items);
		return items;
	}
	const [lastContent, setLastContent] = useState(value);
	useEffect(() => {
		if (value !== lastContent && onChecklistChange) {
			const checklists = extractChecklistFromMarkdown(value);
			onChecklistChange(taskId, checklists);
			setLastContent(value);
		}
	}, [value, onChecklistChange, taskId]);
	return (
		<div data-color-mode="light">
			<MDEditor
				hideToolbar={true}
				preview="edit"
				value={value}
				onChange={onChange}
				previewOptions={{
					remarkPlugins: [gfm],
					rehypePlugins: [],
				}}
			/>
		</div>
	);
}
