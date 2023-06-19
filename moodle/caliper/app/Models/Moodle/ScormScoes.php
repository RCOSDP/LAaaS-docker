<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $scorm
 * @property string $manifest
 * @property string $organization
 * @property string $parent
 * @property string $identifier
 * @property string $launch
 * @property string $scormtype
 * @property string $title
 * @property integer $sortorder
 */
class ScormScoes extends MoodleBase
{
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'scorm_scoes';

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
        'scorm',
        'manifest',
        'organization',
        'parent',
        'identifier',
        'launch',
        'scormtype',
        'title',
        'sortorder',
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
            'scorm',
            'launch',
            'title',
        ]);
    }
}
