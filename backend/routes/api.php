<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::apiResource('tasks', TaskController::class);

Route::get('/test', function () {
    return 'API is working';
});
