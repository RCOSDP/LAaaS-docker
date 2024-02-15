<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property integer $quiz
 * @property integer $scorm
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $grade
 */
class Scormadaptivequiz extends MoodleBase
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'scormadaptivequiz';

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
        'course',
        'quiz',
        'scorm',
        'name',
        'intro',
        'introformat',
        'timecreated',
        'timemodified',
        'grade'
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
            'course',
            'name',
            'intro'
        ]);
    }
}
