import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import './MDEditor.css';

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
	value,
	onChange,
	onChecklistChange,
}: MarkdownEditorProps) {
	return (
		<div data-color-mode="light">
			<MDEditor
				hideToolbar={true}
				preview="edit"
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
