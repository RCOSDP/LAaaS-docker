<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $allowduplicatedentries
 * @property string $displayformat
 * @property integer $mainglossary
 * @property integer $showspecial
 * @property integer $showalphabet
 * @property integer $showall
 * @property integer $allowcomments
 * @property integer $allowprintview
 * @property integer $usedynalink
 * @property integer $defaultapproval
 * @property string $approvaldisplayformat
 * @property integer $globalglossary
 * @property integer $entbypage
 * @property integer $editalways
 * @property integer $rsstype
 * @property integer $rssarticles
 * @property integer $assessed
 * @property integer $assesstimestart
 * @property integer $assesstimefinish
 * @property integer $scale
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $completionentries
 */
class Glossary extends MoodleBase
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'glossary';

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
        'allowduplicatedentries',
        'displayformat',
        'mainglossary',
        'showspecial',
        'showalphabet',
        'showall',
        'allowcomments',
        'allowprintview',
        'usedynalink',
        'defaultapproval',
        'approvaldisplayformat',
        'globalglossary',
        'entbypage',
        'editalways',
        'rsstype',
        'rssarticles',
        'assessed',
        'assesstimestart',
        'assesstimefinish',
        'scale',
        'timecreated',
        'timemodified',
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
