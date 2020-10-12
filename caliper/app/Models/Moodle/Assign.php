<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $alwaysshowdescription
 * @property integer $nosubmissions
 * @property integer $submissiondrafts
 * @property integer $sendnotifications
 * @property integer $sendlatenotifications
 * @property integer $duedate
 * @property integer $allowsubmissionsfromdate
 * @property integer $grade
 * @property integer $timemodified
 * @property integer $requiresubmissionstatement
 * @property integer $completionsubmit
 * @property integer $cutoffdate
 * @property integer $gradingduedate
 * @property integer $teamsubmission
 * @property integer $requireallteammemberssubmit
 * @property integer $teamsubmissiongroupingid
 * @property integer $blindmarking
 * @property integer $revealidentities
 * @property string $attemptreopenmethod
 * @property int $maxattempts
 * @property integer $markingworkflow
 * @property integer $markingallocation
 * @property integer $sendstudentnotifications
 * @property integer $preventsubmissionnotingroup
 */
class Assign extends MoodleBase
{
    const CREATED_AT = null;
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'assign';

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
        'alwaysshowdescription',
        'nosubmissions',
        'submissiondrafts',
        'sendnotifications',
        'sendlatenotifications',
        'duedate',
        'allowsubmissionsfromdate',
        'grade',
        'timemodified',
        'requiresubmissionstatement',
        'completionsubmit',
        'cutoffdate',
        'gradingduedate',
        'teamsubmission',
        'requireallteammemberssubmit',
        'teamsubmissiongroupingid',
        'blindmarking',
        'revealidentities',
        'attemptreopenmethod',
        'maxattempts',
        'markingworkflow',
        'markingallocation',
        'sendstudentnotifications',
        'preventsubmissionnotingroup'
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
            'intro',
            'duedate',
            'allowsubmissionsfromdate',
            'grade',
            'maxattempts'
        ]);
    }
}
