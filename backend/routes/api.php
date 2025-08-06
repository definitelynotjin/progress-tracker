<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\KanbanController;

use Illuminate\Support\Facades\Route;


Route::apiResource('tasks', TaskController::class);
Route::get('/kanban', [KanbanController::class, 'index']);
