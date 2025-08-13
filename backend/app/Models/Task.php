<?php

namespace App\Models;

use App\Models\BoardColumn;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    protected $casts = [
        'due_date' => 'array',
    ];
    protected $fillable = [
        'title',
        'content',
        'board_column_id',
        'priority',
        'assignee',
        'due_date',
        'order',
    ];
    public function boardColumn(): BelongsTo
    {
        return $this->belongsTo(BoardColumn::class);
    }
}
