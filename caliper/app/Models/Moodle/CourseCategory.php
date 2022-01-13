<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property string $name
 * @property string $idnumber
 * @property string $description
 * @property integer $descriptionformat
 * @property integer $parent
 * @property integer $sortorder
 * @property integer $coursecount
 * @property integer $visible
 * @property integer $visibleold
 * @property integer $timemodified
 * @property integer $depth
 * @property string $path
 * @property string $theme
 */
class CourseCategory extends MoodleBase
{
    public const CREATED_AT = null;
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
        'name',
        'idnumber',
        'description',
        'descriptionformat',
        'parent',
        'sortorder',
        'coursecount',
        'visible',
        'visibleold',
        'timemodified',
        'depth',
        'path',
        'theme'
    ];

    /**
     * Scope a query to only include required column.
     *
     * @param  \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeColumn($query)
    {
        return $query->select(['name']);
    }
}
