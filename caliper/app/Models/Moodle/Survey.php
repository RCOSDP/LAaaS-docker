<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property integer $template
 * @property int $days
 * @property integer $timecreated
 * @property integer $timemodified
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property string $questions
 * @property integer $completionsubmit
 */
class Survey extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'survey';

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
        'template',
        'days',
        'timecreated',
        'timemodified',
        'name',
        'intro',
        'introformat',
        'questions',
        'completionsubmit'
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
