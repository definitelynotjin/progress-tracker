<?php

use Illuminate\Support\Facades\Route;

Route::apiResource('tasks', \App\Http\Controllers\TaskController::class);
