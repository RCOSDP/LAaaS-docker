<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Data
{
    function readData(int $id): Models\Data
    {
        return Models\Data::find($id);
    }
}