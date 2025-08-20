<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\KanbanController;
use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', TaskController::class);
Route::apiResource('/kanban', KanbanController::class, );


Route::options('{any}', function () {
    return response()->json([], 204)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
})->where('any', '.*');
