<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $questionusageid
 * @property integer $slot
 * @property string $behaviour
 * @property integer $questionid
 * @property integer $variant
 * @property float $maxmark
 * @property float $minfraction
 * @property float $maxfraction
 * @property integer $flagged
 * @property string $questionsummary
 * @property string $rightanswer
 * @property string $responsesummary
 * @property integer $timemodified
 */
class QuestionAttempt extends MoodleBase
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
        'questionusageid',
        'slot',
        'behaviour',
        'questionid',
        'variant',
        'maxmark',
        'minfraction',
        'maxfraction',
        'flagged',
        'questionsummary',
        'rightanswer',
        'responsesummary',
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
        return $query;
    }
}
