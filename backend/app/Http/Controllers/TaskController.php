<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'board_column_id' => 'required|integer',
            'priority' => 'nullable|string',
            'assignee' => 'nullable|string',
            'due_date' => 'nullable|array',
            'due_date.from' => 'nullable|date',
            'due_date.to' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        $task = Task::create($data);
        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'board_column_id' => 'required|integer',
            'priority' => 'nullable|string',
            'assignee' => 'nullable|string',
            'due_date' => 'nullable|array',
            'due_date.from' => 'nullable|date',
            'due_date.to' => 'nullable|date',
            'order' => 'nullable|integer',
        ]);

        $task->update($data);
        return response()->json($task, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete($task);
        return response()->json(null, 204);
    }
}
