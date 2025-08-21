'use client';

import { useState } from 'react';
import { ColumnType } from '@/app/types/types';
import { Button } from '@/components/ui/button';

interface DeleteTaskModalProps {
	column: ColumnType;
	onSubmit: (id: number) => void;
	onCancel: () => void;
}

export default function DeleteTaskModal({
	onSubmit,
	onCancel,
}: DeleteTaskModalProps) {
	const [taskName, setTaskName] = useState('');

	const handleDelete = () => {
		if (taskName.trim()) {
			onSubmit(taskName.trim());
			setTaskName('');
		}
	};
	return (
		<div className="absolute z-50 inset-1 flex items-center justify-center bg-black bg-opacity-50 ">
			<div className="bg-gray-700 rounded-md p-6 flex justify-center flex-col">
				<div className="mt-auto flex justify-end gap-2">
					<Button
						onClick={onCancel}
						className="px-2 py-2 bg-gray-600 rounded-md hover:text-red-600  "
					>
						Cancel
					</Button>
					<Button
						onClick={handleDelete}
						className=" px-4 py-2 bg-gray-600 rounded-md hover:text-green-500 "
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
}
