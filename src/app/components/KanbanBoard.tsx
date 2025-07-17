'use client';

import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ColumnType = 'To Do' | 'In Progress' | 'Done';

const initialTasks: Record<ColumnType, string[]> = {
    'To Do': ['Create login page', 'Design UI'],
    'In Progress': ['Setup Firebase'],
    Done: ['Initialize project'],
};

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Record<ColumnType, string[]>>(initialTasks);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const sourceCol = active.data.current?.column as ColumnType;
        const targetCol = over.data.current?.column as ColumnType;
        if (!sourceCol || !targetCol) return;

        if (sourceCol === targetCol) {
            const oldIndex = tasks[sourceCol].indexOf(active.id as string);
            const newIndex = tasks[targetCol].indexOf(over.id as string);
            setTasks((prev) => ({
                ...prev,
                [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
            }));
        } else {
            setTasks((prev) => {
                const sourceTasks = prev[sourceCol].filter((t) => t !== active.id);
                const targetTasks = [...prev[targetCol]];
                const overIndex = targetTasks.indexOf(over.id as string);
                targetTasks.splice(overIndex, 0, active.id as string);
                return {
                    ...prev,
                    [sourceCol]: sourceTasks,
                    [targetCol]: targetTasks,
                };
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-8">
                <div className="inline-flex gap-6 w-max">
                    {Object.entries(tasks).map(([column, items]) => (
                        <div
                            key={column}
                            className="bg-gray-100 rounded-lg shadow-md p-4 w-80 min-h-[400px] flex flex-col"
                        >
                            <h2 className="text-lg font-semibold mb-3">{column}</h2>
                            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                                <div className="flex-1 space-y-3">
                                    {items.map((task) => (
                                        <DraggableCard key={task} id={task} column={column} />
                                    ))}
                                </div>
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

export default KanbanBoard;

interface DraggableCardProps {
    id: string;
    column: string;
}

const DraggableCard = ({ id, column }: DraggableCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { column },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white p-4 rounded shadow cursor-move"
        >
            {id}
        </div>
    );
};
