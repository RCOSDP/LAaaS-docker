<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Label
{
    function readLabel(int $id): Models\Label
    {
        return Models\Label::find($id);
    }
}