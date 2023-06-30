<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property string $eventname
 * @property string $component
 * @property string $action
 * @property string $target
 * @property string $objecttable
 * @property integer $objectid
 * @property string $crud
 * @property integer $edulevel
 * @property integer $contextid
 * @property integer $contextlevel
 * @property integer $contextinstanceid
 * @property string $userid
 * @property integer $courseid
 * @property integer $relateduserid
 * @property integer $anonymous
 * @property string $other
 * @property integer $timecreated
 * @property string $origin
 * @property string $ip
 * @property integer $realuserid
 */
class Event extends MoodleBase
{
    public const UPDATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'logstore_standard_log';

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
        'eventname',
        'component',
        'action',
        'target',
        'objecttable',
        'objectid',
        'crud',
        'edulevel',
        'contextid',
        'contextlevel',
        'contextinstanceid',
        'userid',
        'courseid',
        'relateduserid',
        'anonymous',
        'other',
        'timecreated',
        'origin',
        'ip',
        'realuserid'
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
            'eventname',
            'objecttable',
            'objectid',
            'contextinstanceid',
            'userid',
            'courseid',
            'relateduserid',
            'other',
            'timecreated',
            'origin'
        ]);
    }
}
