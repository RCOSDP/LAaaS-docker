<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $assignment
 * @property integer $userid
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $grader
 * @property float $grade
 * @property integer $attemptnumber
 */
class AssignGrades extends MoodleBase
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
        'assignment',
        'userid',
        'timecreated',
        'timemodified',
        'grader',
        'grade',
        'attemptnumber'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query->select([
            'id',
            'assignment',
            'grader',
            'grade',
            'attemptnumber'
        ]);
    }
}
