<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $quiz
 * @property string $userid
 * @property int $attempt
 * @property integer $uniqueid
 * @property string $layout
 * @property integer $currentpage
 * @property integer $preview
 * @property string $state
 * @property integer $timestart
 * @property integer $timefinish
 * @property integer $timemodified
 * @property integer $timemodifiedoffline
 * @property integer $timecheckstate
 * @property float $sumgrades
 */
class QuizAttempts extends MoodleBase
{
    const CREATED_AT = null;
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
        'quiz',
        'userid',
        'attempt',
        'uniqueid',
        'layout',
        'currentpage',
        'preview',
        'state',
        'timestart',
        'timefinish',
        'timemodified',
        'timemodifiedoffline',
        'timecheckstate',
        'sumgrades'
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
            'attempt',
            'quiz'
        ]);
    }
}
