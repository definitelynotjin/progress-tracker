import React, { useEffect, useRef, useState } from 'react';

export interface ChecklistItem {
	id: string;
	text: string;
	done: boolean;
}

export interface SimpleEditorProps {
	taskId: string | number;
	value: string;
	onChange: (content: string) => void;
	onChecklistChange?: (
		taskId: string | number,
		checklist: ChecklistItem[],
	) => void;
	className?: string;
}

export default function SimpleEditor({
	taskId,
	value,
	onChange,
	onChecklistChange,
}: SimpleEditorProps) {
	const [mounted, setMounted] = useState(false);
	const [, setFadeIn] = useState(false);
	const quillRef = useRef<HTMLDivElement>(null);
	const quillInstance = useRef<any>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (mounted) {
			const timeout = setTimeout(() => setFadeIn(true), 10);
			return () => clearTimeout(timeout);
		}
	}, [mounted]);

	useEffect(() => {
		if (mounted && quillRef.current && !quillInstance.current && typeof window !== 'undefined') {
			import('quill').then((QuillModule) => {
				const Quill = QuillModule.default;
				quillInstance.current = new Quill(quillRef.current, {
					theme: 'snow',
					modules: {
						toolbar: [['list', 'bullet']],
					},
				});

				quillInstance.current.on('text-change', () => {
					if (quillInstance.current) {
						onChange(quillInstance.current.root.innerHTML);
					}
				});

				if (value) {
					quillInstance.current.root.innerHTML = value;
				}
			});
		}

		return () => {
			if (quillInstance.current) {
				quillInstance.current = null;
			}
		};
	}, [mounted, value, onChange]);

	if (!mounted) return null;

	return (
		<div
			ref={quillRef}
			className="text-gray-200 bg-gray-600 min-h-[200px] w-full"
		/>
	);
}
