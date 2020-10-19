<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property integer $timeopen
 * @property integer $timeclose
 * @property integer $timelimit
 * @property string $overduehandling
 * @property integer $graceperiod
 * @property string $preferredbehaviour
 * @property integer $canredoquestions
 * @property int $attempts
 * @property integer $attemptonlast
 * @property integer $grademethod
 * @property integer $decimalpoints
 * @property integer $questiondecimalpoints
 * @property int $reviewattempt
 * @property int $reviewcorrectness
 * @property int $reviewmarks
 * @property int $reviewspecificfeedback
 * @property int $reviewgeneralfeedback
 * @property int $reviewrightanswer
 * @property int $reviewoverallfeedback
 * @property integer $questionsperpage
 * @property string $navmethod
 * @property integer $shuffleanswers
 * @property float $sumgrades
 * @property float $grade
 * @property integer $timecreated
 * @property integer $timemodified
 * @property string $password
 * @property string $subnet
 * @property string $browsersecurity
 * @property integer $delay1
 * @property integer $delay2
 * @property integer $showuserpicture
 * @property integer $showblocks
 * @property integer $completionattemptsexhausted
 * @property integer $completionpass
 * @property integer $allowofflineattempts
 */
class Quiz extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'quiz';

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
        'timeopen',
        'timeclose',
        'timelimit',
        'overduehandling',
        'graceperiod',
        'preferredbehaviour',
        'canredoquestions',
        'attempts',
        'attemptonlast',
        'grademethod',
        'decimalpoints',
        'questiondecimalpoints',
        'reviewattempt',
        'reviewcorrectness',
        'reviewmarks',
        'reviewspecificfeedback',
        'reviewgeneralfeedback',
        'reviewrightanswer',
        'reviewoverallfeedback',
        'questionsperpage',
        'navmethod',
        'shuffleanswers',
        'sumgrades',
        'grade',
        'timecreated',
        'timemodified',
        'password',
        'subnet',
        'browsersecurity',
        'delay1',
        'delay2',
        'showuserpicture',
        'showblocks',
        'completionattemptsexhausted',
        'completionpass',
        'allowofflineattempts'
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
            'intro',
            'grade'
        ]);
    }
}
