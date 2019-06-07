<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Lti
{
    function readLti(int $id): Models\Lti
    {
        return Models\Lti::find($id);
    }
}