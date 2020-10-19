<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $assignment
 * @property integer $grade
 * @property string $commenttext
 * @property integer $commentformat
 */
class AssignfeedbackComment extends MoodleBase
{
    const CREATED_AT = null;
    const UPDATED_AT = null;
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
        'assignment',
        'grade',
        'commenttext',
        'commentformat'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query->select(['commenttext']);
    }
}
