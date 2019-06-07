<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Assignment
{
    function readAssignment(int $id): Models\Assignment
    {
        return Models\Assignment::find($id);
    }
}