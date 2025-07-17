"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Define the columns names (type)
type ColumnType = "To Do" | "In Progress" | "Done";

// Initial tasks for each column
const initialTasks: Record<ColumnType, string[]> = {
    "To Do": ["Create login page", "Design UI"],
    "In Progress": ["Setup Firebase"],
    Done: ["Initialize project"],
};

const KanbanBoard = () => {
    // State holds the tasks grouped by column
    const [tasks, setTasks] = useState<Record<ColumnType, string[]>>(initialTasks);

    // Set up drag sensors (mouse/touch)
    const sensors = useSensors(useSensor(PointerSensor));

    // This function runs when you finish dragging a task
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        // If dropped outside or on itself, do nothing
        if (!over || active.id === over.id) return;

        // Get source and target column names from dragged item and drop target
        const sourceCol = active.data.current?.column as ColumnType;
        const targetCol = over.data.current?.column as ColumnType;

        if (!sourceCol || !targetCol) return;

        if (sourceCol === targetCol) {
            // Moving task inside the same column (reorder)
            const oldIndex = tasks[sourceCol].indexOf(active.id as string);
            const newIndex = tasks[targetCol].indexOf(over.id as string);

            // Move task inside the array and update state
            setTasks((prev) => ({
                ...prev,
                [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
            }));
        } else {
            // Moving task from one column to another

            setTasks((prev) => {
                // Remove task from source column
                const newSourceTasks = prev[sourceCol].filter((task) => task !== active.id);

                // Insert task into target column at the right position
                const newTargetTasks = [...prev[targetCol]];
                const overIndex = newTargetTasks.indexOf(over.id as string);
                newTargetTasks.splice(overIndex, 0, active.id as string);

                // Update state with both changes
                return {
                    ...prev,
                    [sourceCol]: newSourceTasks,
                    [targetCol]: newTargetTasks,
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
            <div className="min-h-screen bg-gray-50 px-6 py-8 flex space-x-6 overflow-x-auto">
                {/* Render columns */}
                {Object.entries(tasks).map(([column, items]) => (
                    <Column key={column} column={column as ColumnType} items={items} />
                ))}
            </div>
        </DndContext>
    );
};

// Props for each column component
interface ColumnProps {
    column: ColumnType;
    items: string[];
}

// Single column with sortable tasks inside
const Column = ({ column, items }: ColumnProps) => {
    return (
        <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md p-5 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">{column}</h2>

            {/* SortableContext lets dnd-kit know which items are sortable */}
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
                    {items.map((task) => (
                        <DraggableCard key={task} id={task} column={column} />
                    ))}
                </div>
            </SortableContext>

            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline text-left">
                + Add a card
            </button>
        </div>
    );
};

// Props for individual draggable task card
interface DraggableCardProps {
    id: string;
    column: ColumnType;
}

const DraggableCard = ({ id, column }: DraggableCardProps) => {
    // useSortable gives props and ref needed to make the element draggable
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { column },
    });

    // Convert drag transform to CSS style
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
            className="bg-gray-100 rounded-md p-3 shadow-sm cursor-move hover:bg-gray-200 transition"
        >
            {id}
        </div>
    );
};

export default KanbanBoard;
