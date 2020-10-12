<?php

namespace App\Models\Moodle;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $userid
 * @property integer $forum
 */
class ForumSubscriptions extends Model
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
