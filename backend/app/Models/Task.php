<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'assignee',
        'column',
        'priority',
        'due_from',
        'due_to',
        'content'
    ];
}
