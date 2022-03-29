<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $type
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $assessed
 * @property integer $assesstimestart
 * @property integer $assesstimefinish
 * @property integer $scale
 * @property integer $maxbytes
 * @property integer $maxattachments
 * @property integer $forcesubscribe
 * @property integer $trackingtype
 * @property integer $rsstype
 * @property integer $rssarticles
 * @property integer $timemodified
 * @property integer $warnafter
 * @property integer $blockafter
 * @property integer $blockperiod
 * @property integer $completiondiscussions
 * @property integer $completionreplies
 * @property integer $completionposts
 * @property integer $displaywordcount
 * @property integer $lockdiscussionafter
 * @property integer $duedate
 * @property integer $cutoffdate
 * @property integer $grade_forum
 * @property integer $grade_forum_notify
 */
class Forum extends MoodleBase
{
    public const CREATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'forum';

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
        'type',
        'name',
        'intro',
        'introformat',
        'assessed',
        'assesstimestart',
        'assesstimefinish',
        'scale',
        'maxbytes',
        'maxattachments',
        'forcesubscribe',
        'trackingtype',
        'rsstype',
        'rssarticles',
        'timemodified',
        'warnafter',
        'blockafter',
        'blockperiod',
        'completiondiscussions',
        'completionreplies',
        'completionposts',
        'displaywordcount',
        'lockdiscussionafter',
        'duedate',
        'cutoffdate',
        'grade_forum',
        'grade_forum_notify'
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
