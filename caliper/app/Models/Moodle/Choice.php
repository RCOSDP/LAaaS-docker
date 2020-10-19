<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $publish
 * @property integer $showresults
 * @property integer $display
 * @property integer $allowupdate
 * @property integer $allowmultiple
 * @property integer $showunanswered
 * @property integer $includeinactive
 * @property integer $limitanswers
 * @property integer $timeopen
 * @property integer $timeclose
 * @property integer $showpreview
 * @property integer $timemodified
 * @property integer $completionsubmit
 */
class Choice extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'choice';

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
        'name',
        'intro',
        'introformat',
        'publish',
        'showresults',
        'display',
        'allowupdate',
        'allowmultiple',
        'showunanswered',
        'includeinactive',
        'limitanswers',
        'timeopen',
        'timeclose',
        'showpreview',
        'timemodified',
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
