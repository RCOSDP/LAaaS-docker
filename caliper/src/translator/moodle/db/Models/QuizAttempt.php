<?php

namespace udzuki\translator\moodle\db\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    function getIdAttribute($value): string
    {
        return "{$this->getConnection()->getConfig('app_url')}/mod/quiz/{$this->quiz}/attempt/{$value}";
    }
}