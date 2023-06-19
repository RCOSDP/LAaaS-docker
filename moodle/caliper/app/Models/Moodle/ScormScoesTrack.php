<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $userid
 * @property integer $scormid
 * @property integer $scoid
 * @property integer $attempt
 * @property string $element
 * @property string $value
 * @property integer $timemodified
 */
class ScormScoesTrack extends MoodleBase
{
    public const CREATED_AT = null;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'scorm_scoes_track';

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
        'userid',
        'scormid',
        'scoid',
        'attempt',
        'element',
        'value',
        'timemodified',
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
            'userid',
            'scormid',
            'scoid',
            'attempt',
            'element',
            'value',
            'timemodified',
        ]);
    }
}
