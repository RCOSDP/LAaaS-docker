<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $scormtype
 * @property string $reference
 * @property string $intro
 * @property integer $introformat
 * @property string $version
 * @property float $maxgrade
 * @property integer $grademethod
 * @property integer $whatgrade
 * @property integer $maxattempt
 * @property integer $forcecompleted
 * @property integer $forcenewattempt
 * @property integer $lastattemptlock
 * @property integer $masteryoverride
 * @property integer $displayattemptstatus
 * @property integer $displaycoursestructure
 * @property integer $updatefreq
 * @property string $sha1hash
 * @property string $md5hash
 * @property integer $revision
 * @property integer $launch
 * @property integer $skipview
 * @property integer $hidebrowse
 * @property integer $hidetoc
 * @property integer $nav
 * @property integer $navpositionleft
 * @property integer $navpositiontop
 * @property integer $auto
 * @property integer $popup
 * @property string $options
 * @property integer $width
 * @property integer $height
 * @property integer $timeopen
 * @property integer $timeclose
 * @property integer $timemodified
 * @property integer $completionstatusrequired
 * @property integer $completionscorerequired
 * @property integer $completionstatusallscos
 * @property integer $displayactivityname
 * @property integer $autocommit
 */
class Scorm extends MoodleBase
{
    public const CREATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'scorm';

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
        'scormtype',
        'reference',
        'intro',
        'introformat',
        'version',
        'maxgrade',
        'grademethod',
        'whatgrade',
        'maxattempt',
        'forcecompleted',
        'forcenewattempt',
        'lastattemptlock',
        'masteryoverride',
        'displayattemptstatus',
        'displaycoursestructure',
        'updatefreq',
        'sha1hash',
        'md5hash',
        'revision',
        'launch',
        'skipview',
        'hidebrowse',
        'hidetoc',
        'nav',
        'navpositionleft',
        'navpositiontop',
        'auto',
        'popup',
        'options',
        'width',
        'height',
        'timeopen',
        'timeclose',
        'timemodified',
        'completionstatusrequired',
        'completionscorerequired',
        'completionstatusallscos',
        'displayactivityname',
        'autocommit'
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
