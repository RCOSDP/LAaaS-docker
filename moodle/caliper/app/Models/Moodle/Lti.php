<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $typeid
 * @property string $toolurl
 * @property string $securetoolurl
 * @property integer $instructorchoicesendname
 * @property integer $instructorchoicesendemailaddr
 * @property integer $instructorchoiceallowroster
 * @property integer $instructorchoiceallowsetting
 * @property string $instructorcustomparameters
 * @property integer $instructorchoiceacceptgrades
 * @property integer $grade
 * @property integer $launchcontainer
 * @property string $resourcekey
 * @property string $password
 * @property integer $debuglaunch
 * @property integer $showtitlelaunch
 * @property integer $showdescriptionlaunch
 * @property string $servicesalt
 * @property string $icon
 * @property string $secureicon
 */
class Lti extends MoodleBase
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lti';

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
        'timecreated',
        'timemodified',
        'typeid',
        'toolurl',
        'securetoolurl',
        'instructorchoicesendname',
        'instructorchoicesendemailaddr',
        'instructorchoiceallowroster',
        'instructorchoiceallowsetting',
        'instructorcustomparameters',
        'instructorchoiceacceptgrades',
        'grade',
        'launchcontainer',
        'resourcekey',
        'password',
        'debuglaunch',
        'showtitlelaunch',
        'showdescriptionlaunch',
        'servicesalt',
        'icon',
        'secureicon'
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
