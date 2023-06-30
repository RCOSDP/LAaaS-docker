<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $assignment
 * @property integer $userid
 * @property integer $timecreated
 * @property integer $timemodified
 * @property string $status
 * @property integer $groupid
 * @property integer $attemptnumber
 * @property integer $latest
 */
class AssignSubmission extends MoodleBase
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'assign_submission';

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
        'status',
        'groupid',
        'attemptnumber',
        'latest'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query->select(['assignment']);
    }
}
