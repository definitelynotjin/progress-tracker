'use client';

import { useState } from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Task } from '../../types/types';
import DeleteTaskModal from './DeleteTaskModal';
import { Trash2 } from 'lucide-react';
import MarkdownEditor from './MDEditor';

type TaskDetailProps = {
	task: Task;
	onSave: (updatedTask: Task) => void;
	onCancel: () => void;
	onDelete: (id: number) => void;
	onCheckListChange?: (
		taskId: string | number,
		checklist: Task['checklist'],
	) => void;
};
type DateRange = {
	from: Date;
	to: Date;
};
export default function TaskDetail({
	task,
	onSave,
	onCancel,
	onDelete,
	onCheckListChange,
}: TaskDetailProps) {
	const [title, setTitle] = useState(task.title);
	const [content, setContent] = useState(task.content || '');
	const [priority, setPriority] = useState(task.priority || 'Medium');
	const [assignee, setAssignee] = useState(task.assignee || '');
	const [checklist, setChecklist] = useState(task.checklist ?? []);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [dueDateRange, setDueDateRange] = useState<DateRange | undefined>(
		task.dueDate &&
			typeof task.dueDate === 'object' &&
			task.dueDate.from &&
			task.dueDate.to
			? { from: new Date(task.dueDate.from), to: new Date(task.dueDate.to) }
			: undefined,
	);

	const formatDate = (date: Date) =>
		`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
			date.getDate(),
		).padStart(2, '0')}`;

	const handleSave = () => {
		if (!task.column) {
			console.error('cannot sae task without column, my brother');
			return;
		}

		onSave({
			...task,
			title,
			column: task.column,
			content,
			checklist,
			priority,
			assignee: task.assignee,
			dueDate: dueDateRange
				? {
						from: formatDate(dueDateRange.from),
						to: formatDate(dueDateRange.to),
					}
				: undefined,
			updatedAt: formatDate(new Date()),
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex flex-row justify-center items-center p-4 z-50">
			<div className="relative flex flex-col bg-gray-700 rounded-lg shadow-lg max-w-2xl w-full p-6 space-y-6">
				<div
					className=" absolute right-3 top-3 h-7 w-7 rounded-full flex items-center justify-center bg-red-400 ml-2 hover:bg-red-800"
					onClick={() => {
						setShowDeleteModal(true);
					}}
				>
					<Trash2 size={18} className="text-white" />
				</div>
				<input
					type="text"
					className="text-white w-full bg-gray-700 text-1xl font-semibold border-b border-gray-500 pb-2 outline-none"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task Title"
					autoFocus
				/>
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-300">Priority:</span>
					{[
						{ label: 'Low', color: 'bg-green-400' },
						{ label: 'Medium', color: 'bg-yellow-500' },
						{ label: 'High', color: 'bg-red-400' },
					].map((opt) => (
						<button
							key={opt.label}
							type="button"
							className={`px-3 py-1 rounded text-xs font-semibold text-white border transition focus:outline-none ${
								opt.color
							} ${
								priority === opt.label
									? 'ring-2 ring-white'
									: 'opacity-70 hover:opacity-100'
							}`}
							onClick={() =>
								setPriority(opt.label as 'Low' | 'Medium' | 'High')
							}
						>
							{opt.label}
						</button>
					))}
				</div>
				{/* Due date range picker */}
				<div className="flex items-center gap-2">
					<span className="text-xs text-gray-300">Date Range:</span>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="text-xs text-gray-600 rounded-md bg-gray-100 px-2 py-1"
							>
								{dueDateRange?.from && dueDateRange?.to
									? `${format(new Date(dueDateRange.from), 'MMM dd, yyyy')} - ${format(
											dueDateRange.to,
											'MMM dd, yyyy',
										)}`
									: dueDateRange?.from
										? format(new Date(dueDateRange.from), 'MMM dd, yyyy')
										: 'Pick range'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="p-0 w-auto">
							<Calendar
								mode="range"
								selected={dueDateRange}
								onSelect={setDueDateRange}
							/>
						</PopoverContent>
					</Popover>
				</div>
				{/* Rich text editor */}
				<MarkdownEditor
					value={content}
					onChange={setContent}
					taskId={task.id}
					onChecklistChange={(id, newChecklist) => {
						setChecklist(newChecklist);
						onCheckListChange?.(id, newChecklist);
					}}
				/>
				{/* Assignee input */}
				<input
					type="text"
					className="w-full bg-gray-700 text-white rounded px-3 py-2 mt-2"
					value={assignee}
					onChange={(e) => setAssignee(e.target.value)}
					placeholder="Assigned to..."
				/>
				{/* Buttons */}
				<div className="flex justify-end gap-4">
					<button
						onClick={onCancel}
						className="px-4 py-2 text-xs rounded bg-gray-300 hover:bg-gray-400"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-4 py-2 text-xs rounded bg-gray-600 text-white hover:bg-gray-700"
					>
						Save
					</button>
				</div>
			</div>

			{showDeleteModal && (
				<DeleteTaskModal
					column={task.column}
					taskId={task.id}
					onSubmit={onDelete}
					onCancel={() => setShowDeleteModal(false)}
				/>
			)}
		</div>
	);
}
