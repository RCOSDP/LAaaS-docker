<?php

namespace udzuki\translator\moodle\db\traits;

use udzuki\translator\moodle\db\Models;

trait Resource
{
    function readResource(int $id): Models\Resource
    {
        return Models\Resource::find($id);
    }
}