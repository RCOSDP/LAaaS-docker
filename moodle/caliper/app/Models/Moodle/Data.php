<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $comments
 * @property integer $timeavailablefrom
 * @property integer $timeavailableto
 * @property integer $timeviewfrom
 * @property integer $timeviewto
 * @property integer $requiredentries
 * @property integer $requiredentriestoview
 * @property integer $maxentries
 * @property integer $rssarticles
 * @property string $singletemplate
 * @property string $listtemplate
 * @property string $listtemplateheader
 * @property string $listtemplatefooter
 * @property string $addtemplate
 * @property string $rsstemplate
 * @property string $rsstitletemplate
 * @property string $csstemplate
 * @property string $jstemplate
 * @property string $asearchtemplate
 * @property integer $approval
 * @property integer $manageapproved
 * @property integer $scale
 * @property integer $assessed
 * @property integer $assesstimestart
 * @property integer $assesstimefinish
 * @property integer $defaultsort
 * @property integer $defaultsortdir
 * @property integer $editany
 * @property integer $notification
 * @property integer $timemodified
 * @property string $config
 * @property integer $completionentries
 */
class Data extends MoodleBase
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
        'comments',
        'timeavailablefrom',
        'timeavailableto',
        'timeviewfrom',
        'timeviewto',
        'requiredentries',
        'requiredentriestoview',
        'maxentries',
        'rssarticles',
        'singletemplate',
        'listtemplate',
        'listtemplateheader',
        'listtemplatefooter',
        'addtemplate',
        'rsstemplate',
        'rsstitletemplate',
        'csstemplate',
        'jstemplate',
        'asearchtemplate',
        'approval',
        'manageapproved',
        'scale',
        'assessed',
        'assesstimestart',
        'assesstimefinish',
        'defaultsort',
        'defaultsortdir',
        'editany',
        'notification',
        'timemodified',
        'config',
        'completionentries'
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
