<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $tobemigrated
 * @property integer $legacyfiles
 * @property integer $legacyfileslast
 * @property integer $display
 * @property string $displayoptions
 * @property integer $filterfiles
 * @property integer $revision
 * @property integer $timemodified
 */
class Resource extends MoodleBase
{
    public const CREATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'resource';

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
        'tobemigrated',
        'legacyfiles',
        'legacyfileslast',
        'display',
        'displayoptions',
        'filterfiles',
        'revision',
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
