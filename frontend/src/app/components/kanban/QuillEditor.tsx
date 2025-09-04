// import Quill from 'quill';
// import React, { useEffect, useRef, useState } from 'react';
// import 'quill/dist/quill.bubble.css';
// export interface ChecklistItem {
// 	id: string;
// 	text: string;
// 	done: boolean;
// }

// export interface QuillEditorProps {
// 	taskId: string | number;
// 	value: string;
// 	onChange: (content: string) => void;
// 	onChecklistChange?: (
// 		taskId: string | number,
// 		checklist: ChecklistItem[],
// 	) => void;
// 	className?: string;
// }

// export default function QuillEditor({
// 	taskId,
// 	value,
// 	onChange,
// 	onChecklistChange,
// }: QuillEditorProps) {
// 	const [mounted, setMounted] = useState(false);
// 	const [, setFadeIn] = useState(false);
// 	const quillRef = useRef<HTMLDivElement>(null);
// 	const quillInstance = useRef<Quill | null>(null);

// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);
// 	useEffect(() => {
// 		if (mounted && quillRef.current && !quillInstance.current) {
// 			quillInstance.current = new Quill(quillRef.current, {
// 				theme: 'bubble',
// 			});
// 			quillInstance.current.on('text-change', () => {
// 				if (quillInstance.current) {
// 					onChange(quillInstance.current.root.innerHTML);
// 				}
// 			});
// 			if (value) {
// 				quillInstance.current.root.innerHTML = value;
// 			}
// 		}
// 		return () => {
// 			if (quillInstance.current) {
// 				(quillInstance.current as any).destroy();
// 			}
// 		};
// 	}, [mounted, value, onChange]);
// 	if (!mounted) return null;

// 	return (
// 		<div
// 			ref={quillRef}
// 			className="text-blue-800 bg-gray-600 h-max  w-screen max-w-full  "
// 		/>
// 	);
// }
