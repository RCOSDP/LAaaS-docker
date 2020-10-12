<?php

namespace App\Models\Moodle;

use Illuminate\Database\Eloquent\Model;

/**
 * @property integer $id
 * @property integer $course
 * @property integer $forum
 * @property string $name
 * @property integer $firstpost
 * @property integer $userid
 * @property integer $groupid
 * @property integer $assessed
 * @property integer $timemodified
 * @property integer $usermodified
 * @property integer $timestart
 * @property integer $timeend
 * @property integer $pinned
 */
class ForumDiscussions extends Model
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
        'course',
        'forum',
        'name',
        'firstpost',
        'userid',
        'groupid',
        'assessed',
        'timemodified',
        'usermodified',
        'timestart',
        'timeend',
        'pinned'
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
            'forum',
            'name'
        ]);
    }
}
