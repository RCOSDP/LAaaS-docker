<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Attempt
{
    function readAttempt(int $id): Models\Attempt
    {
        return Models\Attempt::find($id);
    }
}