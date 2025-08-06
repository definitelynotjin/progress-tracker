<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class BoardColumn extends Model
{

    protected $fillable = [
        'name',
        'order',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class)->orderBy('order');
    }
}
