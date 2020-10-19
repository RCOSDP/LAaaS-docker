<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property string $assignmenttype
 * @property integer $resubmit
 * @property integer $preventlate
 * @property integer $emailteachers
 * @property integer $var1
 * @property integer $var2
 * @property integer $var3
 * @property integer $var4
 * @property integer $var5
 * @property integer $maxbytes
 * @property integer $timedue
 * @property integer $timeavailable
 * @property integer $grade
 * @property integer $timemodified
 */
class Assignment extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'assignment';

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
        'assignmenttype',
        'resubmit',
        'preventlate',
        'emailteachers',
        'var1',
        'var2',
        'var3',
        'var4',
        'var5',
        'maxbytes',
        'timedue',
        'timeavailable',
        'grade',
        'timemodified'
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
