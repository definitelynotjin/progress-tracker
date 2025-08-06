<?php

namespace App\Http\Controllers;

use App\Models\BoardColumn;
use Illuminate\Support\Facades\Response;


class KanbanController extends Controller
{
    public function index()
    {
        $columns = BoardColumn::with(['tasks' => fn($q) => $q->orderBy('order')])
            ->orderBy('order')
            ->get();

        return response::json($columns);
    }
}
