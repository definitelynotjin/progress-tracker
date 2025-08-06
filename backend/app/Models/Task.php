<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BoardColumn;


class Task extends Model
{
    public function boardColumn()
    {
        return $this->belongsTo(BoardColumn::class);
    }
}
