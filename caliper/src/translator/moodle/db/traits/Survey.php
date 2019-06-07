<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Survey
{
    function readSurvey(int $id): Models\Survey
    {
        return Models\Survey::find($id);
    }
}