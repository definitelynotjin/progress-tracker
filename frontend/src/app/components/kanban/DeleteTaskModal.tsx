import { ColumnType } from '@/app/types/types';

interface DeleteTaskModalProps {
	taskId: number | string;
	column: ColumnType;
	onSubmit: (id: number) => void;
	onCancel: () => void;
}

export default function DeleteTaskModal({
	taskId,
	onSubmit,
	onCancel,
}: DeleteTaskModalProps) {
	return (
		<div className="absolute z-50 inset-1 flex items-center justify-center bg-black bg-opacity-50 ">
			<div className="bg-gray-700 rounded-md p-6 flex justify-center flex-col">
				<div className="text-gray-300 mb-5 h-5">
					Are you sure to delete this task?
				</div>

				<div className="mt-auto flex justify-end gap-2">
					<button
						onClick={onCancel}
						className="px-2 py-2 text-xs bg-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-400  "
					>
						Cancel
					</button>
					<button
						onClick={() => onSubmit(taskId)}
						className=" px-4 py-2 text-xs  bg-gray-600 rounded-md hover:text-red-600 hover:bg-gray-800 "
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
