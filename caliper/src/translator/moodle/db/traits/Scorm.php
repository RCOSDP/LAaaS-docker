<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Scorm
{
    function readScorm(int $id): Models\Scorm
    {
        return Models\Scorm::find($id);
    }
}