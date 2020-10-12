<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $category
 * @property integer $sortorder
 * @property string $fullname
 * @property string $shortname
 * @property string $idnumber
 * @property string $summary
 * @property integer $summaryformat
 * @property string $format
 * @property integer $showgrades
 * @property int $newsitems
 * @property integer $startdate
 * @property integer $enddate
 * @property integer $marker
 * @property integer $maxbytes
 * @property integer $legacyfiles
 * @property integer $showreports
 * @property integer $visible
 * @property integer $visibleold
 * @property integer $groupmode
 * @property integer $groupmodeforce
 * @property integer $defaultgroupingid
 * @property string $lang
 * @property string $calendartype
 * @property string $theme
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $requested
 * @property integer $enablecompletion
 * @property integer $completionnotify
 * @property integer $cacherev
 */
class Course extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'course';

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
        'category',
        'sortorder',
        'fullname',
        'shortname',
        'idnumber',
        'summary',
        'summaryformat',
        'format',
        'showgrades',
        'newsitems',
        'startdate',
        'enddate',
        'marker',
        'maxbytes',
        'legacyfiles',
        'showreports',
        'visible',
        'visibleold',
        'groupmode',
        'groupmodeforce',
        'defaultgroupingid',
        'lang',
        'calendartype',
        'theme',
        'timecreated',
        'timemodified',
        'requested',
        'enablecompletion',
        'completionnotify',
        'cacherev'
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
            'category',
            'fullname'
        ]);
    }
}
