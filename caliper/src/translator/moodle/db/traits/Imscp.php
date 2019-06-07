<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Imscp
{
    function readImscp(int $id): Models\Imscp
    {
        return Models\Imscp::find($id);
    }
}