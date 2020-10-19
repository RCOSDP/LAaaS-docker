<?php

namespace App\Models\Moodle;

use App\Models\Moodle\MoodleBase;

/**
 * @property integer $id
 * @property integer $course
 * @property string $name
 * @property string $intro
 * @property integer $introformat
 * @property string $instructauthors
 * @property integer $instructauthorsformat
 * @property string $instructreviewers
 * @property integer $instructreviewersformat
 * @property integer $timemodified
 * @property integer $phase
 * @property integer $useexamples
 * @property integer $usepeerassessment
 * @property integer $useselfassessment
 * @property float $grade
 * @property float $gradinggrade
 * @property string $strategy
 * @property string $evaluation
 * @property integer $gradedecimals
 * @property integer $nattachments
 * @property string $submissionfiletypes
 * @property integer $latesubmissions
 * @property integer $maxbytes
 * @property integer $examplesmode
 * @property integer $submissionstart
 * @property integer $submissionend
 * @property integer $assessmentstart
 * @property integer $assessmentend
 * @property integer $phaseswitchassessment
 * @property string $conclusion
 * @property integer $conclusionformat
 * @property integer $overallfeedbackmode
 * @property integer $overallfeedbackfiles
 * @property string $overallfeedbackfiletypes
 * @property integer $overallfeedbackmaxbytes
 */
class Workshop extends MoodleBase
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'workshop';

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
        'instructauthors',
        'instructauthorsformat',
        'instructreviewers',
        'instructreviewersformat',
        'timemodified',
        'phase',
        'useexamples',
        'usepeerassessment',
        'useselfassessment',
        'grade',
        'gradinggrade',
        'strategy',
        'evaluation',
        'gradedecimals',
        'nattachments',
        'submissionfiletypes',
        'latesubmissions',
        'maxbytes',
        'examplesmode',
        'submissionstart',
        'submissionend',
        'assessmentstart',
        'assessmentend',
        'phaseswitchassessment',
        'conclusion',
        'conclusionformat',
        'overallfeedbackmode',
        'overallfeedbackfiles',
        'overallfeedbackfiletypes',
        'overallfeedbackmaxbytes'
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
