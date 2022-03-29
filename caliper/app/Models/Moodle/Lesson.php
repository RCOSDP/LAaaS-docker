<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $practice
 * @property integer $modattempts
 * @property integer $usepassword
 * @property string $password
 * @property integer $dependency
 * @property string $conditions
 * @property integer $grade
 * @property integer $custom
 * @property integer $ongoing
 * @property integer $usemaxgrade
 * @property integer $maxanswers
 * @property integer $maxattempts
 * @property integer $review
 * @property integer $nextpagedefault
 * @property integer $feedback
 * @property integer $minquestions
 * @property integer $maxpages
 * @property integer $timelimit
 * @property integer $retake
 * @property integer $activitylink
 * @property string $mediafile
 * @property integer $mediaheight
 * @property integer $mediawidth
 * @property integer $mediaclose
 * @property integer $slideshow
 * @property integer $width
 * @property integer $height
 * @property string $bgcolor
 * @property integer $displayleft
 * @property integer $displayleftif
 * @property integer $progressbar
 * @property integer $available
 * @property integer $deadline
 * @property integer $timemodified
 * @property integer $completionendreached
 * @property integer $completiontimespent
 * @property integer $allowofflineattempts
 */
class Lesson extends MoodleBase
{
    public const CREATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lesson';

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
        'practice',
        'modattempts',
        'usepassword',
        'password',
        'dependency',
        'conditions',
        'grade',
        'custom',
        'ongoing',
        'usemaxgrade',
        'maxanswers',
        'maxattempts',
        'review',
        'nextpagedefault',
        'feedback',
        'minquestions',
        'maxpages',
        'timelimit',
        'retake',
        'activitylink',
        'mediafile',
        'mediaheight',
        'mediawidth',
        'mediaclose',
        'slideshow',
        'width',
        'height',
        'bgcolor',
        'displayleft',
        'displayleftif',
        'progressbar',
        'available',
        'deadline',
        'timemodified',
        'completionendreached',
        'completiontimespent',
        'allowofflineattempts'
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
