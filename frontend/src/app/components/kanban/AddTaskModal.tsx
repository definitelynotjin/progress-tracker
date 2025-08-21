'use client';

import { useState } from 'react';
import { ColumnType } from '@/app/types/types';
import { Button } from '@/components/ui/button';

interface AddTaskModalProps {
	column: ColumnType;
	onSubmit: (taskName: string) => void;
	onCancel: () => void;
}

export default function AddTaskModal({
	onSubmit,
	onCancel,
}: AddTaskModalProps) {
	const [taskName, setTaskName] = useState('');

	const handleSubmit = () => {
		if (taskName.trim()) {
			onSubmit(taskName.trim());
			setTaskName('');
		}
	};
	return (
		<div className="absolute z-50 inset-1 flex items-center justify-center bg-black bg-opacity-50 ">
			<div className="bg-gray-700 rounded-md p-6 flex justify-center flex-col">
				<form>
					<input
						required
						type="text"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						placeholder="Add Task Name"
						className="rounded-sm text-gray-600 p-4 h-5 bg-gray-300 mb-5 "
					/>
				</form>
				<div className="mt-auto flex justify-end gap-2">
					<Button
						onClick={onCancel}
						className="px-2 py-2 bg-gray-600 rounded-md hover:text-red-600  "
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className=" px-4 py-2 bg-gray-600 rounded-md hover:text-green-500 "
					>
						Add
					</Button>
				</div>
			</div>
		</div>
	);
}
