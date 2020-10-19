<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $slot
 * @property integer $quizid
 * @property integer $page
 * @property integer $requireprevious
 * @property integer $questionid
 * @property float $maxmark
 */
class QuizSlot extends MoodleBase
{
    /**
     * The "type" of the auto-incrementing ID.
     * 
     * @var string
     */
    protected $keyType = 'integer';

    /**
     * @var array
     */
    protected $fillable = [
        'slot',
        'quizid',
        'page',
        'requireprevious',
        'questionid',
        'maxmark'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query;
    }
}
