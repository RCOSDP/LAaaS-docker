<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Workshop
{
    function readWorkshop(int $id): Models\Workshop
    {
        return Models\Workshop::find($id);
    }
}