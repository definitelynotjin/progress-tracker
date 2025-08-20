'use client';

import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskDetail from './TaskDetail';
import AddTaskModal from './AddTaskModal';
import type { ColumnType, Task } from '../../types/types';
import useBoardStore from '@/app/stores/boardStore';

export default function KanbanBoard() {
	const { tasks, loadTasks, updateTask, newTask, deleteTask, setTasks } =
		useBoardStore();

	useEffect(() => {
		loadTasks();
	}, [loadTasks]);

	const [columnOrder, setColumnOrder] = useState<ColumnType[]>(
		Object.keys(tasks ?? {}) as ColumnType[],
	);
	const [modalColumn, setModalColumn] = useState<ColumnType | null>(null);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const handleAddCard = (column: ColumnType) => {
		setModalColumn(column);
	};

	const handleTaskClick = (task: Task) => {
		setSelectedTask(task);
	};
	const handleTaskSave = async (updatedTask: Task) => {
		try {
			await updateTask(updatedTask);
			setSelectedTask(null);
		} catch (error) {
			toast.error('Failed to update task');
		}
	};

	const handleTaskCancel = () => setSelectedTask(null);

	const handleModalSubmit = (taskName: string) => {
		if (modalColumn && taskName.trim()) {
			newTask({
				title: taskName.trim(),
				content: '',
				column: modalColumn,
			});
			setModalColumn(null);
		}
	};

	//
	// possibly the checklist thingy,i forgot
	const handleChecklistChange = (
		taskId: string,
		checklist: Task['checklist'],
	) => {
		setTasks((prev) => {
			const updated = { ...prev };
			for (const col of Object.keys(updated) as ColumnType[]) {
				updated[col] = updated[col].map((task) =>
					task.id === taskId ? { ...task, checklist } : task,
				);
			}
			return updated;
		});
	};

	const sensors = useSensors(useSensor(PointerSensor));

	// Unified drag logic for columns and cards
	const handleDragStart = (event: DragEndEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);
		if (!over || active.id === over.id) return;

		// Column drag
		if (
			columnOrder.includes(active.id as ColumnType) &&
			columnOrder.includes(over.id as ColumnType)
		) {
			const oldIndex = columnOrder.findIndex((col) => col === active.id);
			const newIndex = columnOrder.findIndex((col) => col === over.id);
			if (oldIndex === -1 || newIndex === -1) return;
			const updated = [...columnOrder];
			const [moved] = updated.splice(oldIndex, 1);
			updated.splice(newIndex, 0, moved);
			setColumnOrder(updated);
			return;
		}

		// Card drag
		const sourceCol = active.data?.current?.column as ColumnType;
		let targetCol = over.data?.current?.column as ColumnType | undefined;
		if (
			!targetCol &&
			typeof over.id === 'string' &&
			over.id.startsWith('placeholder-')
		) {
			targetCol = over.id.replace('placeholder-', '') as ColumnType;
		}
		if (!sourceCol || !targetCol) return;
		if (sourceCol === targetCol) {
			const oldIndex = tasks[sourceCol].findIndex(
				(task) => task.id === active.id,
			);
			const newIndex = tasks[targetCol].findIndex(
				(task) => task.id === over.id,
			);
			const updated = [...tasks[sourceCol]];
			const [moved] = updated.splice(oldIndex, 1);
			updated.splice(newIndex, 0, moved);
			setTasks((prev) => ({
				...prev,
				[sourceCol]: updated,
			}));
		} else {
			setTasks((prev) => {
				const newSourceTasks = prev[sourceCol].filter(
					(task) => task.id !== active.id,
				);
				const movedTask = prev[sourceCol].find((task) => task.id === active.id);
				if (!movedTask) return prev;
				const updatedMovedTask = { ...movedTask, column: targetCol };
				const newTargetTasks = [...prev[targetCol]];
				const overIndex = newTargetTasks.findIndex(
					(task) => task.id === over.id,
				);
				newTargetTasks.splice(overIndex, 0, updatedMovedTask);
				return {
					...prev,
					[sourceCol]: newSourceTasks,
					[targetCol]: newTargetTasks,
				};
			});
		}
	};

	// Wrapper for sortable column
	function SortableColumn({
		id,
		children,
	}: {
		id: string;
		children: React.ReactNode;
	}) {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable({ id });
		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? 0.5 : 1,
		};
		return (
			<div ref={setNodeRef} style={style} {...attributes} className="relative">
				{/* Handlebar for dragging column */}
				<button
					{...listeners}
					className="absolute left-1 top-1.5 z-10 flex items-center justify-center w-7 h-7 rounded bg-gray-700 hover:bg-gray-200 cursor-grab"
					style={{ cursor: 'grab' }}
					aria-label="Drag column"
				>
					<GripVertical
						size={22}
						className="text-gray-400 group-hover:text-gray-900"
					/>
				</button>
				<div className="pl-11">{children}</div>
			</div>
		);
	}

	const activeTask = Object.values(tasks ?? {})
		.flat()
		.find((task) => task.id === activeId);

	return (
		<>
			{/* Unified DndContext for columns and cards */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={columnOrder}
					strategy={horizontalListSortingStrategy}
				>
					<div className="flex flex-row  gap-4 rounded-xl w-full bg-gray-800 p-16 min-h-screen overflow-x-auto">
						{columnOrder.map((column) => (
							<SortableColumn key={column} id={column}>
								<Column
									column={column}
									items={tasks[column] ?? []}
									onAddCard={() => handleAddCard(column)}
									onTaskClick={handleTaskClick}
									onChecklistChange={handleChecklistChange}
								/>
							</SortableColumn>
						))}
					</div>
				</SortableContext>
				<DragOverlay>
					{activeTask ? <TaskCard task={activeTask} /> : null}
				</DragOverlay>
			</DndContext>
			{modalColumn && (
				<AddTaskModal
					column={modalColumn}
					onSubmit={handleModalSubmit}
					onCancel={() => setModalColumn(null)}
				/>
			)}
			{selectedTask && (
				<TaskDetail
					task={selectedTask}
					onSave={handleTaskSave}
					onCancel={handleTaskCancel}
				/>
			)}
		</>
	);
}
