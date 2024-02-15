<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $userid
 * @property integer $forum
 */
class ForumSubscriptions extends MoodleBase
{
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
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
        'forum'
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
            'userid',
            'forum'
        ]);
    }
}
