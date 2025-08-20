<?php

namespace App\Http\Controllers;

use App\Models\BoardColumn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class KanbanController extends Controller
{
    // GET /kanban - list all columns with tasks
    public function index()
    {
        $columns = BoardColumn::with(['tasks' => fn($q) => $q->orderBy('order')])
            ->orderBy('order')
            ->get();

        return response()->json($columns);
    }

    // GET /kanban/{id} - show a single column (optional)
    public function show($id)
    {
        $column = BoardColumn::with(['tasks' => fn($q) => $q->orderBy('order')])->findOrFail($id);
        return response()->json($column);
    }

    // POST /kanban - create a new column
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        $column = BoardColumn::create($data);

        return response()->json($column, 201);
    }

    // PUT/PATCH /kanban/{id} - update a column
    public function update(Request $request, $id)
    {
        $column = BoardColumn::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'order' => 'sometimes|required|integer',
        ]);

        $column->update($data);

        return response()->json($column);
    }

    // DELETE /kanban/{id} - delete a column
    public function destroy($id)
    {
        $column = BoardColumn::findOrFail($id);
        $column->delete();

        return response()->json(null, 204);
    }
}
