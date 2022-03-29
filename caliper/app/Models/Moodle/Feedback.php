<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $anonymous
 * @property integer $email_notification
 * @property integer $multiple_submit
 * @property integer $autonumbering
 * @property string $site_after_submit
 * @property string $page_after_submit
 * @property integer $page_after_submitformat
 * @property integer $publish_stats
 * @property integer $timeopen
 * @property integer $timeclose
 * @property integer $timemodified
 * @property integer $completionsubmit
 */
class Feedback extends MoodleBase
{
    public const CREATED_AT = null;
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
        'anonymous',
        'email_notification',
        'multiple_submit',
        'autonumbering',
        'site_after_submit',
        'page_after_submit',
        'page_after_submitformat',
        'publish_stats',
        'timeopen',
        'timeclose',
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
