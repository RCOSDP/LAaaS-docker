<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Choice
{
    function readChoice(int $id): Models\Choice
    {
        return Models\Choice::find($id);
    }
}