<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $category
 * @property integer $parent
 * @property string $name
 * @property string $questiontext
 * @property integer $questiontextformat
 * @property string $generalfeedback
 * @property integer $generalfeedbackformat
 * @property float $defaultmark
 * @property float $penalty
 * @property string $qtype
 * @property integer $length
 * @property string $stamp
 * @property string $version
 * @property integer $hidden
 * @property integer $timecreated
 * @property integer $timemodified
 * @property integer $createdby
 * @property integer $modifiedby
 * @property string $idnumber
 */
class Question extends MoodleBase
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'question';

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
        'parent',
        'name',
        'questiontext',
        'questiontextformat',
        'generalfeedback',
        'generalfeedbackformat',
        'defaultmark',
        'penalty',
        'qtype',
        'length',
        'stamp',
        'version',
        'hidden',
        'timecreated',
        'timemodified',
        'createdby',
        'modifiedby',
        'idnumber'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query;
    }
}
