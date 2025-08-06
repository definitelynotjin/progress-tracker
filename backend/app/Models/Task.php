<?php

namespace App\Models;

use App\Models\BoardColumn;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'title',
        'content',
        'board_column_id',
        'priority',
        'assignee',
        'due_date',
        'order',
    ];
    public function boardColumn()
    {
        return $this->belongsTo(BoardColumn::class);
    }
}
