<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Assign
{
    function readAssign(int $id): Models\Assign
    {
        return Models\Assign::find($id);
    }

    function readAssignGrade(int $id): Models\AssignGrade
    {
        return Models\AssignGrade::find($id);
    }

    function readAssignSubmission(int $id): Models\AssignSubmission
    {
        return Models\AssignSubmission::find($id);
    }

    function readGradeComment(int $assign, int $grade): Models\AssignfeedbackComment
    {
        return Models\AssignfeedbackComment::where([
            ['assignment', $assign],
            ['grade', $grade]
        ])->get();
    }
}